import { Request } from "express";
import bcrypt from "bcrypt";
export const signupDataValidation = (req: Request) => {
  const { firstName, lastName, password, gender } = req.body;
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
