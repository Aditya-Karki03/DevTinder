import { Request, Response } from "express";
import {
  connectionStatusValidator,
  isValidObjectId,
  validStatusType,
} from "../utils/validation";
import { User } from "../schema/user";
import { Connection } from "../schema/connection";
import { statusEnum } from "../interface/connectionInterface";

export class ConnectionController {
  async sendConnectionRequest(req: Request, res: Response) {
    const toRequest = req?.params?.userId;
    const status = req?.params?.status;
    const fromRequest = req?.user?._id;

    //status should only be either "send" or "ignore"
    const { error } = connectionStatusValidator(status);
    if (error) {
      res.status(400).json({
        message: "Please send a valid status",
        user: null,
      });
      return;
    }

    //check if the user id is valid for the toUserId
    const isValid = isValidObjectId(toRequest);
    if (!isValid) {
      res.status(400).json({
        message: "Invalid user id",
        user: null,
      });
      return;
    }
    try {
      const isUserValid = await User.findById(toRequest);
      if (!isUserValid) {
        res.status(404).json({
          message: "User does not exist",
          user: null,
        });
        return;
      }
      //if user exists, than we check if this user was previously sent request or not or
      //if the fromUserId has already sent me the request
      const requestExist = await Connection.findOne({
        $or: [
          { toRequest, fromRequest },
          { toUserId: toRequest, fromUserId: fromRequest },
        ],
      });
      if (requestExist) {
        res.status(400).json({
          message: `Connection request was already ${requestExist.status}`,
          user: null,
        });
        return;
      }
      //a user should not be able to send him his own request, checked in the mongoose middleware using pre
      const newUserConnection = new Connection({
        fromRequest,
        toRequest,
        status,
      });
      const data = await newUserConnection.save();
      res.status(201).json({
        message: `Connection ${status} successfully`,
        user: data,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message || "Something went wrong",
        user: null,
      });
    }
  }
  // request/getAllConnections
  async getAllConnectionRequest(req: Request, res: Response) {
    //get all connection request with status as "send" to me (loggedIn user)
    const { user } = req;
    try {
      //use populate method to get all name of the user
      //to use populate we need to link two collections using ref
      const allConnections = await Connection.find({
        toRequest: user?._id,
        status: "send",
      }).populate("fromRequest", [
        "firstName",
        "lastName",
        "gender",
        "age",
        "photoUrl",
        "about",
        "skills",
      ]);
      if (allConnections.length == 0) {
        res.status(400).json({
          message: "No Connection request",
          user: null,
        });
        return;
      }
      res.status(200).json({
        message: `We have ${allConnections.length} for you to be reviewed`,
        user: allConnections,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong.",
        user: null,
      });
    }
  }
  // post /request/review/:status/:requestId
  //route for accepting or rejecting the connection request
  async acceptConnectionRequest(req: Request, res: Response) {
    const { user } = req;
    const { status, connectionId } = req.params;
    const isValidStatus = validStatusType(status);
    if (!isValidStatus) {
      res.status(400).json({
        message: "Invalid status type",
        user: null,
      });
      return;
    }
    //only the logged in user should be able to accept the connection request
    //toRequest stores the information of to whom the connection request was sent
    //if toRequest===loggedIn user than only accept or reject otherwise don't
    //toRequest && toRequest.toString()!==user?._id.toString()
    // if (!user?._id.equals(toRequest)) {
    //   res.status(404).json({
    //     message: "You are not authorized to acccept/reject this connection",
    //     user: null,
    //   });
    // }
    try {
      const isValidConnection = await Connection.findOne({
        _id: connectionId,
        status: "send",
        toRequest: user?._id,
      });
      if (!isValidConnection) {
        res.status(404).json({
          message: "Request not received from this user",
          user: null,
        });
        return;
      }
      //if the connection request exist than we accept/reject depending on the status
      status == "accepted"
        ? (isValidConnection.status = statusEnum.Accept)
        : (isValidConnection.status = statusEnum.reject);
      const connectionData = await isValidConnection.save();
      res.status(200).json({
        message: `Connection request ${status}`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        user: null,
      });
    }
  }
  //getAll accepted Connections for the logged In user
  async getAllAcceptedConnections(req: Request, res: Response) {
    const { user } = req;
    try {
      //get all the connections either sent by you or send to you and are at accepted state
      const allAcceptedConnections = await Connection.find({
        $or: [
          {
            fromRequest: user?._id,
            status: "accept",
          },
          {
            toRequest: user?._id,
            status: "accept",
          },
        ],
      })
        .populate("fromRequest", ["firstName", "lastName", "gender"])
        .populate("toRequest", ["firstName", "lastName", "gender"]);
      //send only the required data
      //fromRequest can output the loggedIn as well as the toRequest
      const data = allAcceptedConnections.map((connection: any) =>
        /* bugfix: allAcceptedConnections can have the data of loggedIn user as well either on 
        toRequest or on fromRequest hence we need to remove them */
        connection.fromRequest._id.equals(user?._id)
          ? connection.toRequest
          : connection.fromRequest
      );
      res.status(200).json({
        message: `You have total of ${allAcceptedConnections.length} friends`,
        user: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
}
