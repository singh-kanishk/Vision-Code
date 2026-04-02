import { useEffect, useRef } from 'react';
import { Stage } from 'react-konva';
import Konva from 'konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useHostDrawingStore } from '@/store/useUserCanvasStore.ts';
import { useEventCanvasStore } from '@/store/useEventCanvasStore.ts';
import { StaticLayer } from './utils/Layers/StaticLayer.tsx';
import { ActiveLayer } from './utils/Layers/ActiveLayer.tsx';
import { ColorPallete } from './utils/ColorPallette.tsx';
import { ShapeSelector } from './utils/ShapeSelector.tsx';
import { socket } from '@/utils/socket-setup.ts';
import type { SendPointEventSchema } from '@my-app/shared';
import { Generator } from '../Generator/Generator.tsx';

type DrawLinePayload = Omit<SendPointEventSchema, 'roomId' | 'completeLine'> & {
  point: SendPointEventSchema['point'] | null;
};

export const Canvas = () => {
  const startLine = useHostDrawingStore((state) => state.startLine);
  const addPointToCurrentLine = useHostDrawingStore(
    (state) => state.addPointToCurrentLine,
  );
  const finishLine = useHostDrawingStore((state) => state.finishLine);

  const remoteStartLine = useEventCanvasStore((state) => state.startLine);
  const remoteAddPointToLine = useEventCanvasStore(
    (state) => state.addPointToLine,
  );
  const remoteFinishLine = useEventCanvasStore(
    (state) => state.finishLine,
  );
  const remoteUndo = useEventCanvasStore((state) => state.undo);
  const remoteClearCanvas = useEventCanvasStore(
    (state) => state.clearCanvas,
  );
  const setStoreRef= useHostDrawingStore((state)=>(state.setRef))

  const isDrawing = useRef<boolean>(false);
  const currentLineId = useRef<string | null>(null);
 
  const handlePointerDown = (e: KonvaEventObject<PointerEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    

    
    currentLineId.current = crypto.randomUUID();
    const pressure = e.evt.pressure ?? 0.5;
    startLine(currentLineId.current, [pos.x, pos.y, pressure], '');
  };

  const handlePointerMove = (e: KonvaEventObject<PointerEvent>): void => {
    if (!isDrawing.current || !currentLineId.current) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;


    const pressure = e.evt.pressure ?? 0.5;
    addPointToCurrentLine(currentLineId.current, [
      pos.x,
      pos.y,
      pressure,
    ]);
  };

  const handlePointerUp = (): void => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    finishLine(currentLineId.current || '');
  };

  useEffect(() => {
    const handleDrawLine = (data: DrawLinePayload) => {
      if (!data?.lineId) return;

      if (data.flag === 'start-point') {
        if (data.point) remoteStartLine(data.lineId, data.point, data.color);
        return;
      }

      if (data.flag === 'mid-point') {
        if (data.point) remoteAddPointToLine(data.lineId, data.point);
        return;
      }

      // 'end-point'
      remoteFinishLine(data.lineId);
    };

    const handleUndoLine = (obj: { lineId: string }) => {
      if (obj?.lineId) remoteUndo(obj.lineId);
    };

    const handleClearCanvas = () => remoteClearCanvas();

    socket.on('draw_line', handleDrawLine);
    socket.on('undo_line', handleUndoLine);
    socket.on('clear_canvas', handleClearCanvas);

    return () => {
      socket.off('draw_line', handleDrawLine);
      socket.off('undo_line', handleUndoLine);
      socket.off('clear_canvas', handleClearCanvas);
    };
  }, [
    remoteAddPointToLine,
    remoteClearCanvas,
    remoteFinishLine,
    remoteStartLine,
    remoteUndo,
  ]);
  
  const stageRef = useRef<Konva.Stage | null>(null);
  useEffect(() => {
    setStoreRef(stageRef);
  }, [setStoreRef]);
  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <Stage
          width={700}
          height={400}
          style={{
            border: '1px solid #060202',
            backgroundColor: '#fafafa',
            touchAction: 'none',
          }}
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <StaticLayer />
          <ActiveLayer />
        </Stage>
      </div>
      <div className='flex gap-2'>
        <ColorPallete />
        <ShapeSelector/>
      </div>
      <div className='flex'>
      <Generator/>
      </div>
    </div>
  );
};
