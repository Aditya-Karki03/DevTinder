import { Request, Response } from "express";
import { User } from "../schema/user";
export class UserController {
  //method to create instance of user in the database
  async createUser(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);
    console.log("------DATA BODY-----");
    // const user = await User.create(userData);
    // res.status(201).json({
    //   message: "User Created Successfully!",
    //   data: user,
    // });

    //check if the provided email already exist in the db
    try {
      const userEmail = await User.find({ email: userData.email });
      if (userEmail.length > 0) {
        res.status(403).json({
          message: "User with this email already exist",
          data: userEmail,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again",
        data: null,
      });
    }

    //another way of doing the same is by creating new instance of user model and saving in db
    const user = new User(userData);
    try {
      await user.save();
      res.status(201).json({
        message: "User created successfully!",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: "Unable to create user.",
        user: null,
      });
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const users = await User.find({});
      if (users) {
        res.status(201).json({
          message: "All users",
          data: users,
        });
      } else {
        res.status(404).json({
          message: "User not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "No user found",
        data: null,
      });
    }
  }
  async getUser(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.status(201).json({
          message: "User found",
          data: user,
        });
      } else {
        res.status(404).json({
          message: "User does not exist",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong.",
        data: null,
      });
    }
  }
}
