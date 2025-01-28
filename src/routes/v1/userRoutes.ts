import express from "express";
import { UserController } from "../../controllers/UserController";
const userRoutes = express.Router();

const userController = new UserController();

//user signup route
userRoutes.post("/signup", userController.createUser);

export default userRoutes;
