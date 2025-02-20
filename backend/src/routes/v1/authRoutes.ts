import express from "express";
import { AuthController } from "../../controllers/AuthController";
import { userAuth } from "../../middleware/userAuth";
import { upload } from "../../middleware/imageUploads";
const authRoutes = express.Router();

const authController = new AuthController();

authRoutes.post("/send-otp", authController.sendOtpForEmailVerification);
authRoutes.post("/verify-otp", authController.otpVerification);
//user signup route
authRoutes.post(
  "/signup",
  upload.single("profile_picture"),
  authController.createUser
);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", userAuth, authController.logout);
// userRoutes.get("/feed", userAuth, userController.getAllUser);
// userRoutes.get("/user", userAuth, userController.getUser);
// userRoutes.delete("/user", userAuth, userController.deleteUser);
// userRoutes.patch("/user", userAuth, userController.updateUser);

export default authRoutes;
