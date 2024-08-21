import { Server, Socket } from "socket.io";
import { NEW_NOTIFICATION } from "../utils/eventTypes";
import { Notification } from "../entity/Notification.entity";

export const notificationHandler = (io: Server, socket: Socket) => {};

export const sendNotification = (io: Server, notification: Notification) => {
  io.emit(NEW_NOTIFICATION, notification);
};
