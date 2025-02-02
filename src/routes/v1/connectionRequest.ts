import express from "express";
import { userAuth } from "../../middleware/userAuth";
import { ConnectionController } from "../../controllers/ConnectionController";
const connectionRoutes = express.Router();

const connectionController = new ConnectionController();

connectionRoutes.post(
  "/send-connection/:status/:userId",
  userAuth,
  connectionController.sendConnectionRequest
);

export default connectionRoutes;
