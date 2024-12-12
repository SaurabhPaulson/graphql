import { Server } from 'socket.io';

export const notifyRoom = (io: Server, room: string, event: string, data: any) => {
  io.to(room).emit(event, data);
};
