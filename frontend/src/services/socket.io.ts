import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io(import.meta.env.VITE_API_ENDPOINT || " ");
};
