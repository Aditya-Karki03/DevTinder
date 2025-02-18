import { Request } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
export const signupDataValidation = (req: Request) => {
  const profilePicture = req.file;
  const { firstName, lastName, password, gender, about, skills } = req.body;
  if (!firstName) {
    return {
      error: true,
      message: "Please Enter your First Name",
    };
  } else if (!lastName) {
    return {
      error: true,
      message: "Please Enter Your Last Name",
    };
  } else if (!password) {
    return {
      error: true,
      message: "Please Enter Your Password",
    };
  } else if (!gender) {
    return {
      error: true,
      message: "Please Enter Your Gender",
    };
  } else if (!about) {
    return {
      error: true,
      message:
        "Please tell briefly tell us about yourself, and limit it within 50 words max.",
    };
  } else if (skills.length == 0) {
    return {
      error: true,
      message: "Please mention your skills, to get better match for you",
    };
  } else if (!profilePicture) {
    return {
      error: true,
      message: "Please upload your picture",
    };
  } else {
    return {
      error: false,
      message: "We have data",
    };
  }
};

export const verifyPassword = async (
  userPassword: string,
  passwordFromDb: string
) => {
  const isValidPassword = await bcrypt.compare(userPassword, passwordFromDb);
  return isValidPassword;
};

export const userUpdateDataValidator = (req: Request) => {
  const expectedData: string[] = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "email",
    "about",
    "skills",
    "photoUrl",
  ];
  const hasExpectedData = Object.keys(req.body).every((value: string) =>
    expectedData.includes(value)
  );
  if (!hasExpectedData) {
    return {
      error: true,
      message: "Invalid Input Data",
    };
  }
  return {
    error: false,
    message: "Input Data is Valid",
  };
};

export const connectionStatusValidator = (status: string) => {
  const expectedStatus: string[] = ["send", "ignore"];
  const hasExpectedData = expectedStatus.includes(status);
  if (!hasExpectedData) {
    return {
      error: true,
      message: "Invalid input data",
    };
  }
  return {
    error: false,
    message: "Input parameter is valid",
  };
};

export const isValidObjectId = (_id: string) => {
  return mongoose.Types.ObjectId.isValid(_id) ? true : false;
};

export const validStatusType = (status: string) => {
  const statusTypes: string[] = ["accepted", "rejected"];
  return statusTypes.includes(status) ? true : false;
};
