

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
export type Shapes = 'rectangle' | 'circle' | 'line' | 'free-hand';

export type Line = {
  points: Point[];
  color: string;
  lineId: string;
  /** Geometric tools; omit or `free-hand` for pressure strokes. */
  shape?: Shapes;
  /** Stroke width used when the line was created (free-hand size / shape outline). */
  brushSize?: number;
};

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
    /** When true with `end-point`, receivers must drop this lineId from active strokes only (no completed line). */
    strokeAborted?: boolean,
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
export interface MessageData {
  userName:string;
  message:string
  roomId?:string
}