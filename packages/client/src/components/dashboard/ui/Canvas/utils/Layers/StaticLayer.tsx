import { Layer } from 'react-konva';
import { useHostDrawingStore } from '@/store/useUserCanvasStore';
import { useEventCanvasStore } from '@/store/useEventCanvasStore';
import { renderLineToKonva } from '../lineKonvaNodes';

export const StaticLayer = () => {
  const lines = useHostDrawingStore((state) => state.lines);
  const remoteLines = useEventCanvasStore((state) => state.lines);
  const brushSize = useHostDrawingStore((state) => state.brushSize);

  return (
    <Layer>
      {lines.map((line) => renderLineToKonva(line, brushSize))}
      {remoteLines.map((line) => renderLineToKonva(line, brushSize))}
    </Layer>
  );
};
