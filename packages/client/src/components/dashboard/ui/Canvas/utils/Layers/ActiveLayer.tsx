import { Layer, Path } from 'react-konva';
import { getStroke } from 'perfect-freehand';
import { useHostDrawingStore } from '@/store/useUserCanvasStore';
import { getSvgPathFromStroke } from '@/utils/svgPathFromStroke';
import { useEventCanvasStore } from '@/store/useEventCanvasStore';
import type { Point } from '@my-app/shared';
import { renderPreviewShape } from '../lineKonvaNodes';

export const ActiveLayer = () => {
  const currentLine = useHostDrawingStore((state) => state.currentLine);
  const strokeColor = useHostDrawingStore((state) => state.strokeColor);
  const selected = useHostDrawingStore((state) => state.selected);
  const brushSize = useHostDrawingStore((state) => state.brushSize);
  const activeLines = useEventCanvasStore((state) => state.activeLines);

  const strokeOptions = {
    size: brushSize,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  };

  const renderRemoteStrokePath = (points: Point[], fill: string, key: string) => {
    const stroke = getStroke(points, strokeOptions);
    const pathData = getSvgPathFromStroke(stroke);
    return <Path key={key} data={pathData} fill={fill} />;
  };

  const remoteActive = Object.entries(activeLines).filter(
    ([, data]) => data.points?.length,
  );

  return (
    <Layer>
      {currentLine && currentLine.length > 0
        ? renderPreviewShape(
            selected,
            currentLine,
            strokeColor,
            brushSize,
            'local-active',
          )
        : null}
      {remoteActive.map(([lineId, data]) =>
        renderRemoteStrokePath(data.points, data.color, lineId),
      )}
    </Layer>
  );
};