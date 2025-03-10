import { Request, Response } from "express";
import { Message } from "../schema/messages";

export class ChatMessages {
  async getMessages(req: Request, res: Response) {
    const { recieverId } = req.body;
    try {
      const userId = req?.user?._id;
      const response = await Message.findOne({
        participants: {
          $all: [userId, recieverId],
        },
      });
      res.status(200).json({
        message: "Chat retreived Successfully!",
        chats: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong, while retrieving chats",
        chats: null,
      });
    }
  }
  async postMessages(req: Request, res: Response) {
    const { recieverId, msg } = req.body;
    try {
      const userId = req.user?._id;
      //below will find existing all chats all the participants inside the array mentioned below
      const user: any = await Message.findOneAndUpdate(
        {
          participants: {
            $all: [recieverId, userId],
          },
        },
        {
          $push: {
            messages: { msg },
          },
        }
      );
      res.status(200).json({
        message: "User Data saved successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. While saving the messages",
        user: null,
      });
    }
  }
}
