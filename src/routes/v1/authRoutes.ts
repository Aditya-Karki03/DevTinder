import express from "express";
import { AuthController } from "../../controllers/AuthController";
import { userAuth } from "../../middleware/userAuth";
const authRoutes = express.Router();

const authController = new AuthController();

//user signup route
authRoutes.post("/user/signup", authController.createUser);
authRoutes.post("/user/login", authController.login);
authRoutes.post("/user/logout", userAuth, authController.logout);
// userRoutes.get("/feed", userAuth, userController.getAllUser);
// userRoutes.get("/user", userAuth, userController.getUser);
// userRoutes.delete("/user", userAuth, userController.deleteUser);
// userRoutes.patch("/user", userAuth, userController.updateUser);

export default authRoutes;
