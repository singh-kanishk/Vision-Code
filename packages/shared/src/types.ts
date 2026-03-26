

export interface User {
  socketId: string;
  username: string;
}

export interface Lobby {
  roomId: string;
  hostId: string;
  passcode:string;
  users: User[];
  status: 'waiting' | 'starting' | 'in-progress';
}

export type Point = [number, number, number]; // [x, y, pressure]
export type Line = { points: Point[], color: string };

