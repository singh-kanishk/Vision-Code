import { io,Socket } from 'socket.io-client';
import { PORT } from '@my-app/shared';

export const socket:Socket = io(`http://localhost:${PORT.server}`) 