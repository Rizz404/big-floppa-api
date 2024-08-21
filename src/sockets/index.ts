import { Server, Socket } from "socket.io";
import { notificationHandler } from "./notificationHandler";

const socketConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected");
    // * Taro kesini socket handlernya
    notificationHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
};

export default socketConfig;
