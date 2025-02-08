import { Request, Response } from "express";
import { User } from "../schema/user";
import { signupDataValidation, verifyPassword } from "../utils/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenGenerator } from "../utils/tokenGenerator";
export class AuthController {
  //method to create instance of user in the database
  async createUser(req: Request, res: Response) {
    const { firstName, lastName, password, age, gender, email } = req.body;
    //always validate the data first even if you have schema defined for that data
    //because schema will be checked only when attempting to save data into db
    //after validation encrypt the password using bycrypt
    //than save the data onto db
    //DO NOT save lke new User(req.body) or new User(userData)
    //because we don't know how many extra params a user is sending, can have extra data as well
    //only save by destructuring the required data from the body

    const { error, message } = signupDataValidation(req);
    if (error) {
      res.status(400).json({
        message,
        data: null,
      });
      return;
    }

    //bcrypt returns us a promise hence we need to await it
    const encryptedPassword = await bcrypt.hash(password, 10);

    // const user = await User.create(userData);
    // res.status(201).json({
    //   message: "User Created Successfully!",
    //   data: user,
    // });

    //check if the provided email already exist in the db
    try {
      const userEmail = await User.find({ email });
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
      const user = new User({
        firstName,
        lastName,
        password: encryptedPassword,
        gender,
        age,
        email,
      });
      await user.save();
      res.status(201).json({
        message: "User created successfully!",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          age: user.age,
          email: user.email,
        },
      });
    } catch (error: any) {
      if (error.name == "ValidationError") {
        const errors = Object.values(error.errors).map(
          (err: any) => err.message
        );
        res.status(400).json({
          message: errors[0],
          user: null,
        });
        return;
      }
      res.status(500).json({
        message: "Something went wrong. Please try again",
        user: null,
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    //first we will try finding email
    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({
          message: "Invalid Credentials",
          user: null,
        });
        return;
      }
      const isValidPassword = await verifyPassword(
        password,
        user?.password || ""
      );

      if (!isValidPassword) {
        res.status(404).json({
          message: "Invalid Credentials",
          user: null,
        });
        return;
      }
      const userId = user._id.toString();
      //create a token with user id
      const token = tokenGenerator(userId);
      res.cookie("loginToken", token);
      //provide user with all data except the password in the response
      //using destructuring separated password from the userData and rest of the data goes to the user
      res.status(201).json({
        message: "User verified successfully",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          age: user.age,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong.",
        user: null,
      });
    }
  }

  async logout(req: Request, res: Response) {
    res.cookie("loginToken", null, {
      expires: new Date(Date.now()),
    });
    res.json({
      message: "Logout Successfull",
      user: null,
    });
  }
}
