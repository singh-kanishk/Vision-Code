import { create } from 'zustand';
import type { Line, Point } from '@my-app/shared';

export interface ActiveLineData {
  points: Point[];
  color: string;
}

export interface EventCanvasState {
  lines: Line[];
  activeLines: Record<string, ActiveLineData>;
  strokeColor: string;

  setStrokeColor: (color: string) => void;
  startLine: (lineId: string, point: Point, color?: string) => void;
  addPointToLine: (lineId: string, point: Point) => void;
  finishLine: (lineId: string, completeLine?: Line) => void;
  /** Drop an in-progress stroke without committing (e.g. host cancelled a tiny shape). */
  abortActiveStroke: (lineId: string) => void;
  undo: (lineId: string) => void;
  clearCanvas: () => void;
}

export const useEventCanvasStore = create<EventCanvasState>((set, get) => ({
  // Remote-only: local drawing is handled by `useHostDrawingStore`.
  lines: [],
  activeLines: {},
  strokeColor: '#1e1e1e',

  setStrokeColor: (color) => set({ strokeColor: color }),

  startLine: (lineId, point, color) => {
    const lineSelectedColor = color || get().strokeColor;
    set((state) => ({
      activeLines: {
        ...state.activeLines,
        [lineId]: { points: [point], color: lineSelectedColor },
      },
    }));
  },

  addPointToLine: (lineId, point) => {
    set((state) => {
      const activeLine = state.activeLines[lineId];
      if (!activeLine) return state;

      return {
        activeLines: {
          ...state.activeLines,
          [lineId]: {
            ...activeLine,
            points: [...activeLine.points, point],
          },
        },
      };
    });
  },

  finishLine: (lineId, completeLine) => {
    set((state) => {
      const newActiveLines = { ...state.activeLines };
      delete newActiveLines[lineId];

      if (completeLine) {
        return {
          lines: [...state.lines, completeLine],
          activeLines: newActiveLines,
        };
      }

      const activeLine = state.activeLines[lineId];
      if (!activeLine) {
        return { ...state, activeLines: newActiveLines };
      }

      const completedLine: Line = {
        points: activeLine.points,
        color: activeLine.color,
        lineId,
      };

      return {
        lines: [...state.lines, completedLine],
        activeLines: newActiveLines,
      };
    });
  },

  abortActiveStroke: (lineId) => {
    set((state) => {
      if (!state.activeLines[lineId]) return state;
      const { [lineId]: _removed, ...rest } = state.activeLines;
      return { activeLines: rest };
    });
  },

  undo: (lineId) => {
    set((state) => {
      const { [lineId]: _removed, ...restActiveLines } = state.activeLines;
      return {
        lines: state.lines.filter((line) => line.lineId !== lineId),
        activeLines: restActiveLines,
      };
    });
  },

  clearCanvas: () => {
    set({ lines: [], activeLines: {} });
  },
}));