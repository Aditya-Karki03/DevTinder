import { Server } from "socket.io";
import crypto from "crypto";
import { Message } from "../schema/messages";

const getHashedRoomId = (loggedInUserId: string, friendId: string) => {
  //sort to make it even for both loggedInUserId & friendId if swapped
  const roomId = [loggedInUserId, friendId].sort().join("");
  //roomId is guessable if both loggedInUserId & friendId are known to third user, better hash it
  const hashedRoomId = crypto.hash("SHA256", roomId);
  return hashedRoomId;
};

export const initializeSocketIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.WEB_ENDPOINT || "",
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", (loggedInUserId, friendId) => {
      const hashedRoomId = getHashedRoomId(loggedInUserId, friendId);
      socket.join(hashedRoomId);
    });
    socket.on("sendMessage", async (message, fromId, toId) => {
      const hashedRoomId = getHashedRoomId(fromId, toId);
      //whatever new msg received save it to db
      try {
        //two ways to find messages pertaining to 2 users
        //1st
        // let messages=await Message.findOne({
        //   $or:[
        //     {participants:[loggedInuserId,friendId]},
        //     {participants:[friendId,loggedInuserId]}
        //   ]
        // })

        //2nd
        let data = await Message.findOne({
          participants: {
            $all: [fromId, toId],
          },
        });
        //if this is the first msg than the messages will turn out to be null from db because of no records
        if (!data) {
          data = new Message({
            participants: [fromId, toId],
            messages: [],
          });
        }
        data?.messages.push({
          senderId: fromId,
          message,
        });
        await data.save();
      } catch (error) {
        console.error(error);
      }
      socket.to(hashedRoomId).emit("messageRecieved", message, fromId, toId);
    });
  });
};
