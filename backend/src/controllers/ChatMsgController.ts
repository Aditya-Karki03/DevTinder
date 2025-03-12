import { Request, Response } from "express";
import { Message } from "../schema/messages";

export class ChatMessages {
  async getMessages(req: Request, res: Response) {
    console.log(req.body);
    const { friendsId } = req.body;
    try {
      const userId = req?.user?._id;
      let data = await Message.findOne({
        participants: {
          $all: [userId, friendsId],
        },
      }).populate("participants", "firstName lastName");
      //if no data than we need to create one
      if (!data) {
        data = new Message({
          participants: [userId, friendsId],
          messages: [],
        });
        await data.save();
      }
      res.status(200).json({
        message: "Chat retreived Successfully!",
        chats: data,
      });
    } catch (error) {
      console.log(error);
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
