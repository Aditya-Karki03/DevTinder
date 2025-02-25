import express from "express";
import { AuthController } from "../../controllers/AuthController";
import { userAuth } from "../../middleware/userAuth";
import { imageAuth, upload } from "../../middleware/imageUploads";
import { otpGenerator, otpVerifier } from "../../middleware/otp";
const authRoutes = express.Router();

const authController = new AuthController();

authRoutes.post("/send-otp", otpGenerator);
authRoutes.post("/verify-otp", otpVerifier);
//user signup route
authRoutes.post(
  "/signup",
  imageAuth,
  //   upload.single("image"),
  authController.createUser
);
//below route will verify the otp and move to login controller automatically
authRoutes.post("/verify-otp-and-login", otpVerifier, authController.login);
authRoutes.post("/logout", userAuth, authController.logout);
// userRoutes.get("/feed", userAuth, userController.getAllUser);
// userRoutes.get("/user", userAuth, userController.getUser);
// userRoutes.delete("/user", userAuth, userController.deleteUser);
// userRoutes.patch("/user", userAuth, userController.updateUser);

export default authRoutes;
