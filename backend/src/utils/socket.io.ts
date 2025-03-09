import { createServer } from "node:http";
import { Server } from "socket.io";

export const initializeSocketIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.WEB_ENDPOINT || "",
    },
  });
};
