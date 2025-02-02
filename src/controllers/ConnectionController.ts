import { Request, Response } from "express";
import {
  connectionStatusValidator,
  isValidObjectId,
} from "../utils/validation";
import { User } from "../schema/user";
import { Connection } from "../schema/connection";

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
          message: `Connection request was already sent`,
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
        message: `Connection ${status} successfully"`,
        user: data,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: error.message || "Something went wrong",
        user: null,
      });
    }
  }
}
