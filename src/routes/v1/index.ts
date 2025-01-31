import express from "express";
import authRoutes from "./authRoutes";
const appRouterV1 = express.Router();

appRouterV1.use("/users", authRoutes);

export default appRouterV1;
