import app from './app';
import dotenv from 'dotenv';
import http from 'http';
import { initSocket } from './sockets/socketHandler';

dotenv.config();

const PORT = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket
const io = initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
  console.log(`WebSocket running on ws://localhost:${PORT}`);
});
