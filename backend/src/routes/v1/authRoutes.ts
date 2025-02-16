import express from "express";
import { AuthController } from "../../controllers/AuthController";
import { userAuth } from "../../middleware/userAuth";
const authRoutes = express.Router();

const authController = new AuthController();

authRoutes.post("/verify-email", authController.verifyEmail);
//user signup route
authRoutes.post("/signup", authController.createUser);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", userAuth, authController.logout);
// userRoutes.get("/feed", userAuth, userController.getAllUser);
// userRoutes.get("/user", userAuth, userController.getUser);
// userRoutes.delete("/user", userAuth, userController.deleteUser);
// userRoutes.patch("/user", userAuth, userController.updateUser);

export default authRoutes;
