import express from "express";
import { UserController } from "../../controllers/UserController";
const userRoutes = express.Router();

const userController = new UserController();

//user signup route
userRoutes.post("/signup", userController.createUser);
userRoutes.get("/feed", userController.getAllUser);
userRoutes.get("/user", userController.getUser);

export default userRoutes;
