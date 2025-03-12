import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io(import.meta.env.API_ENDPOINT || "http://localhost:3000");
};
