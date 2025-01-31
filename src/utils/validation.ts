import { Request } from "express";
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
