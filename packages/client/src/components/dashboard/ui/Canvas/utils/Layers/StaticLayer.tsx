import { Layer, Path } from 'react-konva';
import { getStroke } from 'perfect-freehand';
import { useHostDrawingStore } from '@/store/useUserCanvasStore';
import { getSvgPathFromStroke } from '@/utils/svgPathFromStroke';
import { useEventCanvasStore } from '@/store/useEventCanvasStore';

export const StaticLayer = () => {
  const lines = useHostDrawingStore((state) => state.lines);
  const remoteLines = useEventCanvasStore((state) => state.lines);

  return (
    <Layer>
      {lines.map((line) => {
        const stroke = getStroke(line.points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        });

        const pathData = getSvgPathFromStroke(stroke);

        return <Path key={line.lineId} data={pathData} fill={line.color} />;
      })}
      {remoteLines.map((line) => {
        const stroke = getStroke(line.points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        });

        const pathData = getSvgPathFromStroke(stroke);

        return <Path key={line.lineId} data={pathData} fill={line.color} />;
      })}
    </Layer>
  );
};
