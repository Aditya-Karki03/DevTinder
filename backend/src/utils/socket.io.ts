import { createServer } from "node:http";
import { Server } from "socket.io";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
    socket.on("sendMessage", (message, loggedInuserId, friendId) => {
      const hashedRoomId = getHashedRoomId(loggedInuserId, friendId);
      socket
        .to(hashedRoomId)
        .emit("messageRecieved", message, loggedInuserId, friendId);
    });
  });
};
