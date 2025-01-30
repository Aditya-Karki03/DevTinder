import { Request, Response } from "express";
import { User } from "../schema/user";
export class UserController {
  //method to create instance of user in the database
  async createUser(req: Request, res: Response) {
    const userData = req.body;
    //always validate the data first even if you have schema defined for that data
    //because schema will be checked only when attempting to save data into db
    //after validation encrypt the password using bycrypt
    //than save the data onto db
    //DO NOT save lke new User(req.body) or new User(userData)
    //because we don't know how many extra params a user is sending, can have extra data as well
    //only save by destructuring the required data from the body

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

    try {
      //another way of doing the same is by creating new instance of user model and saving in db
      const user = new User(userData);
      await user.save();
      res.status(201).json({
        message: "User created successfully!",
        data: user,
      });
    } catch (error: any) {
      if (error.name == "ValidationError") {
        // const errors = Object.values(error.errors).map(
        //   (err: any) => err.message
        // );
        res.status(400).json({
          message: error.message,
          user: null,
        });
        return;
      }
      res.status(500).json({
        message: "Something went wrong. ",
        user: null,
      });
    }
  }
  // catch (error: any) {
  //   if (error.name === "ValidationError") {
  //     const errors = Object.values(error.errors).map((err: any) => err.message);
  //     return res.status(400).json({ success: false, errors });
  //   }

  //   return res.status(500).json({ success: false, message: "Internal Server Error" });
  // }

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
  async updateUser(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);
    try {
      const user = await User.findByIdAndUpdate(userData.userId, userData);
      console.log(user);
      if (user) {
        res.status(204).json({
          message: "User data updated successfully!",
          data: user,
        });
      } else {
        res.status(404).json({
          message: "Cannot find the user of that id",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong. Please try again",
        data: null,
      });
    }
  }
  async deleteUser(req: Request, res: Response) {
    const { userId } = req.body;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        res.status(404).json({
          message: "User not found to delete",
          data: user,
        });
        return;
      } else {
        res.status(201).json({
          message: "User deleted succssfully!",
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        data: null,
      });
    }
  }
}
