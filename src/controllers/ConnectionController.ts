import { Request, Response } from "express";
import { connectionStatusValidator } from "../utils/validation";
import { User } from "../schema/user";

export class ConnectionController {
  async sendConnectionRequest(req: Request, res: Response) {
    const toUserId = req?.params?.userId;
    const status = req?.params?.status;
    const fromUserId = req?.user?._id;

    //status should only be either "send" or "ignore"
    const { error } = connectionStatusValidator(status);
    if (error) {
      res.status(400).json({
        message: "Please send a valid status",
        user: null,
      });
      return;
    }
    // //check if the user id is valid for the toUserId
    try {
      const isUserValid = await User.findById(toUserId);
      if (!isUserValid) {
        res.status(404).json({
          message: "User does not exist",
          user: null,
        });
        return;
      }
      //if user exists, than we check if this user was previously sent request or not
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        user: null,
      });
    }
  }
}
