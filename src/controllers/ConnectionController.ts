import { Request, Response } from "express";
import { connectionStatusValidator } from "../utils/validation";

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
    // //check if the user already sent a connection request to this particular user
    try {
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        user: null,
      });
    }
  }
}
