

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
  lines:Line[]
}

export type Point = [number, number, number]; // [x, y, pressure]
export type Line = { points: Point[], color: string  ,lineId :string};

export const PORT ={
    server:3000,
    db:5342
} as const


export interface SendPointEventSchema {
    roomId:string,
    point?:Point,
    completeLine?:Line,
    flag:'start-point'|'end-point'|'mid-point',
    lineId:string,
    color?:string,
}
export interface UndoLineSchema{
  roomId:string,
  lineId:string
}
export interface RectangleData {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}