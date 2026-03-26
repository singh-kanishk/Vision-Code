import { create } from 'zustand';
// Import your actual socket instance here
import { socket } from '@/utils/socket-setup';
import type { Line , Point } from '@my-app/shared';

export interface DrawingState {
  
  lines: Line[];
  currentLine: Point[] | null;
  strokeColor: string;

  
  setStrokeColor: (color: string) => void;
  startLine: (point: Point) => void;
  addPointToCurrentLine: (point: Point) => void;
  finishLine: () => void;
  undo: () => void;
  clearCanvas: () => void;
}

// Throttling configuration
const THROTTLE_MS = 30; // ~33 frames per second. Adjust as needed.
let lastEmitTime = 0;

export const useDrawingStore = create<DrawingState>((set, get) => ({
  lines: [],
  currentLine: null,
  strokeColor: '#1e1e1e',

  setStrokeColor: (color) => set({ strokeColor: color }),

  startLine: (point) => {
    // 1. Update local state instantly
    set({ currentLine: [point] });
    
    // 2. Emit to server
    const { strokeColor } = get();
    socket.emit('draw:start', { point, color: strokeColor });
  },

  addPointToCurrentLine: (point) => {
    // 1. Update local state instantly so the user sees no lag
    set((state) => {
      if (!state.currentLine) return state;
      return { currentLine: [...state.currentLine, point] };
    });

    // 2. Throttle the network emission
    const now = Date.now();
    if (now - lastEmitTime > THROTTLE_MS) {
      socket.emit('draw:move', { point });
      lastEmitTime = now;
    }
  },

  finishLine: () => {
    set((state) => {
      if (!state.currentLine) return state;
      
      const completedLine = { points: state.currentLine, color: state.strokeColor };
      
      // Emit the finish event with the completed line data
      // (Bypassing throttle to ensure the final state is always sent)
      socket.emit('draw:finish', { line: completedLine });

      return {
        lines: [...state.lines, completedLine],
        currentLine: null,
      };
    });
  },

  undo: () => {
    set((state) => ({
      lines: state.lines.slice(0, -1),
      currentLine: null,
    }));
    socket.emit('draw:undo');
  },

  clearCanvas: () => {
    set({ lines: [], currentLine: null });
    socket.emit('draw:clear');
  },
}));