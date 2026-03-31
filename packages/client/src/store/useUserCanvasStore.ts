import { create } from 'zustand';
// Import your actual socket instance here
import type { Line, Point } from '@my-app/shared';
import { useLobbyStore } from './useLobbyStore';
import { emitClearCanvas, emitPoint, emitUndoLine } from '@/components/dashboard/ui/Canvas/utils/events/emit-point';

export interface DrawingState {
  
  lines: Line[];
  currentLine: Point[] | null;
  strokeColor: string;

  setLine:(lines:Line[])=>void
  setStrokeColor: (color: string) => void;
  startLine: (lineId:string,point: Point,color:string) => void;
  addPointToCurrentLine: (lineId:string,point: Point) => void;
  finishLine: (lineId:string) => void;
  undo: (lineId:string) => void;
  clearCanvas: () => void;
}
// Throttling configuration
const THROTTLE_MS = 10;
let lastEmitTime = 0;

export const useHostDrawingStore = create<DrawingState>((set, get) => ({
  lines: [],
  currentLine: null,
  strokeColor: '#1e1e1e',

  setStrokeColor: (color) => set({ strokeColor: color }),
  setLine:(obj)=>{
    const newLines = get().lines
      for(let i of obj){
        newLines.push(i)
      }
     set((state) => ({
      lines:[...state.lines,...newLines]
     }));
    
  },
  startLine: (lineId, point, color) => {
   
    set({ currentLine: [point] });

    
    const lineSelectedColor = color || get().strokeColor;
    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    emitPoint({roomId,flag:'start-point',lineId,color:lineSelectedColor,point:point})
    
  },

  addPointToCurrentLine: (lineId, point) => {
    set((state) => {
      if (!state.currentLine) return state;
      return { currentLine: [...state.currentLine, point] };
    });

    
      const roomId = useLobbyStore.getState().lobby?.roomId || '';
      const now = Date.now();
      if (now - lastEmitTime > THROTTLE_MS) {
        emitPoint({
          point:point,
          color:get().strokeColor,
          roomId:roomId,
          lineId:lineId,
          flag:'mid-point'
        })
        lastEmitTime = now;
      
    }
  },

  finishLine: (lineId) => {
   set((state) => {
      if (!state.currentLine) return state;
      
      const completeLine:Line = { points: state.currentLine, color: state.strokeColor ,lineId};
      
      
        const roomId = useLobbyStore.getState().lobby?.roomId || '';
        emitPoint({lineId,flag:'end-point',roomId,completeLine})
      
      return {
        lines: [...state.lines, completeLine],
        currentLine:null
      };
      
    });
  },

  undo: (lineId:string) => {
    set((state) => ({
      lines: state.lines.filter((line) => line.lineId !== lineId),
      currentLine: null, 
    }));
    
    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    emitUndoLine({lineId,roomId})
  },

  clearCanvas: () => {
    set({ lines: [] });
    const roomId = useLobbyStore.getState().lobby?.roomId || '';
    emitClearCanvas(roomId);
  
  },
}));
