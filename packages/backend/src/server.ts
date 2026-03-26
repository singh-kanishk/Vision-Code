import express from 'express';
import { PORT } from '@my-app/shared';
import { Server } from 'socket.io';
import http from 'http';
import { setupLobbies } from './routes/lobbies.js';

const app = express();
const backendPort= PORT.server||3000;

const allowedOrigins = [
  'http://localhost:5173',
  `http://localhost:${backendPort}`
];

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin:allowedOrigins,
    methods:['GET','POST']
  }
})


app.use(express.json())



httpServer.listen(backendPort, () => {
  console.log(`Backend server running on http://localhost:${backendPort}`);
});

setupLobbies(io);
