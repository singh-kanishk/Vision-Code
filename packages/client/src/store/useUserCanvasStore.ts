import { create } from 'zustand';
import type { Line, Point, Shapes } from '@my-app/shared';
import { useLobbyStore } from './useLobbyStore';
import { emitClearCanvas, emitPoint, emitUndoLine } from '@/components/dashboard/ui/Canvas/utils/events/emit-point';
import Konva from 'konva';
import { createRef } from 'react';


export interface DrawingState {
  lines: Line[];
  currentLine: Point[] | null;
  strokeColor: string;
  brushSize: number;
  ref: React.RefObject<Konva.Stage | null>;
  selected: Shapes;

  setRef: (ref: React.RefObject<Konva.Stage | null>) => void;
  setLine: (lines: Line[]) => void;
  setStrokeColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  startLine: (lineId: string, point: Point, color: string) => void;
  addPointToCurrentLine: (lineId: string, point: Point) => void;
  finishLine: (lineId: string) => void;
  cancelCurrentLine: () => void;
  undo: (lineId: string) => void;
  clearCanvas: () => void;
  setSelected: (shape: Shapes) => void;
}
// Throttling configuration
const THROTTLE_MS = 10;
let lastEmitTime = 0;

export const useHostDrawingStore = create<DrawingState>((set, get) => ({
  lines: [],
  currentLine: null,
  strokeColor: '#1e1e1e',
  brushSize: 16,
  ref: createRef<Konva.Stage | null>(),
  selected: 'free-hand',

  setRef: (ref) => set({ ref }),
  setStrokeColor: (color) => set({ strokeColor: color }),
  setBrushSize: (size) => set({ brushSize: size }),

  setSelected(shape) {
    set({selected:shape})    
  },
  setLine:(newLines)=>{
    set((state) => ({
      lines: [...state.lines, ...newLines]
    }));
    
  },
  startLine: (lineId, point, color) => {
    set({ currentLine: [point] });

    if (get().selected !== 'free-hand') return;

    const lineSelectedColor = color || get().strokeColor;
    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    emitPoint({
      roomId,
      flag: 'start-point',
      lineId,
      color: lineSelectedColor,
      point: point,
    });
  },

  addPointToCurrentLine: (lineId, point) => {
    const selected = get().selected;
    set((state) => {
      if (!state.currentLine?.length) return state;
      if (selected !== 'free-hand') {
        const start = state.currentLine[0];
        return { currentLine: [start, point] };
      }
      return { currentLine: [...state.currentLine, point] };
    });

    if (selected !== 'free-hand') return;

    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    const now = Date.now();
    if (now - lastEmitTime > THROTTLE_MS) {
      emitPoint({
        point: point,
        color: get().strokeColor,
        roomId: roomId,
        lineId: lineId,
        flag: 'mid-point',
      });
      lastEmitTime = now;
    }
  },

  finishLine: (lineId) => {
    const selected = get().selected;
    const brushSize = get().brushSize;
    const roomId = useLobbyStore.getState().lobby?.roomId || '';

    const pts = get().currentLine;
    if (!pts?.length) return;

    if (selected !== 'free-hand') {
      const tooSmall =
        pts.length < 2 ||
        (Math.abs(pts[0][0] - pts[1][0]) < 3 &&
          Math.abs(pts[0][1] - pts[1][1]) < 3);
      if (tooSmall) {
        emitPoint({
          lineId,
          flag: 'end-point',
          roomId,
          strokeAborted: true,
        });
        set({ currentLine: null });
        return;
      }
    }

    set((state) => {
      if (!state.currentLine?.length) return state;
      const committed = state.currentLine;

      const completeLine: Line = {
        points: committed,
        color: state.strokeColor,
        lineId,
        brushSize,
        ...(selected !== 'free-hand' ? { shape: selected } : {}),
      };

      emitPoint({ lineId, flag: 'end-point', roomId, completeLine });

      return {
        lines: [...state.lines, completeLine],
        currentLine: null,
      };
    });
  },

  cancelCurrentLine: () => set({ currentLine: null }),

  undo: (lineId:string) => {
    set((state) => ({
      lines: state.lines.filter((line) => line.lineId !== lineId),
      currentLine: null, 
    }));
    
    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    emitUndoLine({lineId,roomId})
  },

  clearCanvas: () => {
    set({ lines: [], currentLine: null });
    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    emitClearCanvas(roomId);
  
  },
}));
