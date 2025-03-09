import { createServer } from "node:http";
import { Server } from "socket.io";
import bcrypt from "bcrypt";

export const initializeSocketIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.WEB_ENDPOINT || "",
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", async (loggedInUserId, friendId) => {
      const roomId = [loggedInUserId, friendId].join("");
      //roomId is guessable if both loggedInUserId & friendId are known to third user, better hash it
      const hashedRoomId = await bcrypt.hash(roomId, 10);
      console.log(loggedInUserId);
      console.log("--------Logged IN ID--------");
      console.log(friendId);
      // console.log(hashedRoomId);
      // socket.join(hashedRoomId);
    });
  });
};
