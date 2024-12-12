import { Server } from 'socket.io';

export const initSocket = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
    });

    socket.on('message', (message: { room: string; text: string }) => {
      io.to(message.room).emit('message', message.text);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
