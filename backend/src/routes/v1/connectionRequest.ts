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
connectionRoutes.get(
  "/get-connection",
  userAuth,
  connectionController.getAllConnectionRequest
);
connectionRoutes.post(
  "/review-connection/:status/:connectionId",
  userAuth,
  connectionController.acceptConnectionRequest
);
connectionRoutes.get(
  "/accepted-connection",
  userAuth,
  connectionController.getAllAcceptedConnections
);

export default connectionRoutes;
