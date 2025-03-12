import express from "express";
import { ChatMessages } from "../../controllers/ChatMsgController";
import { userAuth } from "../../middleware/userAuth";
const chatRoutes = express.Router();

const chatMsgController = new ChatMessages();

chatRoutes.post("/get-message", userAuth, chatMsgController.getMessages);
chatRoutes.post("/save-message", userAuth, chatMsgController.postMessages);
export default chatRoutes;
