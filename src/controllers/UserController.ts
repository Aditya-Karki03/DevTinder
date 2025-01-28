import { Request, Response } from "express";
import { User } from "../schema/user";
export class UserController {
  //method to create instance of user in the database
  async createUser(req: Request, res: Response) {
    // const userData = req.body;

    // const user = await User.create(userData);
    // res.status(201).json({
    //   message: "User Created Successfully!",
    //   data: user,
    // });

    //another way of doing the same is by creating new instance of user model and saving in db
    const user = new User({
      firstName: "Adi",
      lastName: "Kar",
      age: 21,
      gender: "male",
    });
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
}
