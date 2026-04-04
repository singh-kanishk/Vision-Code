import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PORT } from '@my-app/shared';
import { Server } from 'socket.io';
import http from 'http';
import { setupLobbies } from './routes/lobbies.js';
import { setCanvas } from './routes/canvas.js';
import { apiRouter } from './routes/routes.js';
import { setText } from './routes/message.js';

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


app.use(express.json({ limit: '50mb' }))
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  }),
);
app.use('/api',apiRouter)


httpServer.listen(backendPort, () => {
  console.log(`Backend server running on http://localhost:${backendPort}`);
});

setupLobbies(io);
setCanvas(io);
setText(io);