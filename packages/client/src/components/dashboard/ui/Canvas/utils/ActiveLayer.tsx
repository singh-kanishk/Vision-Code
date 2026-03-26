import { Layer, Path } from 'react-konva';
import { getStroke } from 'perfect-freehand';
import { useDrawingStore } from '@/store/useCanvasStore';
import { getSvgPathFromStroke } from '@/utils/svgPathFromStroke';

export const ActiveLayer = () => {
  const currentLine = useDrawingStore((state) => state.currentLine);
  const strokeColor = useDrawingStore((state) => state.strokeColor);

  if (!currentLine || currentLine.length === 0) return <Layer />;

  const stroke = getStroke(currentLine, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const pathData = getSvgPathFromStroke(stroke);

  return (
    <Layer>
      <Path data={pathData} fill={strokeColor} />
    </Layer>
  );
};