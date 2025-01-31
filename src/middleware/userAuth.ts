import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../schema/user";

interface jwtPayload {
  userId: string;
  iat: number;
}

//since the user cannot be set onto request object hence new type for it
interface userInfo {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

//globally declaring that we are adding a user type on the Request object
//we are using interface Request because the Request interface is written in interface by Express
//and since we are using interface here as well both of them are merged instead of replacing it
//Express is the name of the module
declare global {
  namespace Express {
    interface Request {
      user?: userInfo;
    }
  }
}

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check and decode the token
  const { loginToken } = req.cookies;
  if (!loginToken) {
    res.status(401).json({
      message: "Please signup/login first to continue",
      user: null,
    });
  }
  const { userId } = jwt.verify(
    loginToken,
    process.env.JWT_SECRET || ""
  ) as jwtPayload;

  try {
    const userInfo = await User.findById(userId);
    if (!userInfo) {
      res.status(404).json({
        message: "User not found, Please login/signup to continue",
        user: null,
      });
      return;
    }
    //if the user is found than put the user into the request object
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
      user: null,
    });
  }
};
