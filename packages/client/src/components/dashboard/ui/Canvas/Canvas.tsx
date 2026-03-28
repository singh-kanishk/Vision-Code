import { useEffect, useRef } from 'react';
import { Stage } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useDrawingStore } from '@/store/useCanvasStore';
import { StaticLayer } from './utils/StaticLayer.tsx';
import { ActiveLayer } from './utils/ActiveLayer.tsx';
import { ColorPallete } from './utils/ColorPallette.tsx';


export const Canvas = () => {

  
  const startLine = useDrawingStore((state) => state.startLine);
  const addPointToCurrentLine = useDrawingStore(
    (state) => state.addPointToCurrentLine,
  );
  const finishLine = useDrawingStore((state) => state.finishLine);

  const isDrawing = useRef<boolean>(false);

  const handlePointerDown = (e: KonvaEventObject<PointerEvent>): void => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    const pressure = e.evt.pressure ?? 0.5;
    startLine([pos.x, pos.y, pressure]);
  };

  const handlePointerMove = (e: KonvaEventObject<PointerEvent>): void => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    const pressure = e.evt.pressure ?? 0.5;
    addPointToCurrentLine([pos.x, pos.y, pressure]);
  };

  const handlePointerUp = (): void => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    finishLine();
  };


  useEffect(()=>{},[] )
  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
      {/* Canvas */}
      <Stage
        width={700}
        
        height={400}
        style={{
          border: '1px solid #060202',
          backgroundColor: '#fafafa',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <StaticLayer />
        <ActiveLayer />
      </Stage>
      </div>
      <div>
      <ColorPallete/>
      </div>      
    </div>
  );
};
