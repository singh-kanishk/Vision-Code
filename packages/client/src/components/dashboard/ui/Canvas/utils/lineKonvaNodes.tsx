import type { ReactNode } from 'react';
import { Ellipse, Line as KonvaLine, Path, Rect } from 'react-konva';
import { getStroke } from 'perfect-freehand';
import type { Line, Point, Shapes } from '@my-app/shared';
import { getSvgPathFromStroke } from '@/utils/svgPathFromStroke';

const freehandOptionsBase = {
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
};

function isGeometricShape(shape: Shapes | undefined): shape is Exclude<Shapes, 'free-hand'> {
  return shape === 'rectangle' || shape === 'circle' || shape === 'line';
}

export function renderLineToKonva(
  line: Line,
  brushSize: number,
): ReactNode {
  const width = line.brushSize ?? brushSize;
  const { points, color, lineId, shape } = line;

  if (isGeometricShape(shape) && points.length >= 2) {
    const [a, b] = points;
    if (shape === 'rectangle') {
      const x = Math.min(a[0], b[0]);
      const y = Math.min(a[1], b[1]);
      const w = Math.abs(b[0] - a[0]);
      const h = Math.abs(b[1] - a[1]);
      return (
        <Rect
          key={lineId}
          x={x}
          y={y}
          width={w}
          height={h}
          stroke={color}
          strokeWidth={width}
          fillEnabled={false}
        />
      );
    }
    if (shape === 'circle') {
      const cx = (a[0] + b[0]) / 2;
      const cy = (a[1] + b[1]) / 2;
      const rx = Math.abs(b[0] - a[0]) / 2;
      const ry = Math.abs(b[1] - a[1]) / 2;
      return (
        <Ellipse
          key={lineId}
          x={cx}
          y={cy}
          radiusX={rx}
          radiusY={ry}
          stroke={color}
          strokeWidth={width}
          fillEnabled={false}
        />
      );
    }
    return (
      <KonvaLine
        key={lineId}
        points={[a[0], a[1], b[0], b[1]]}
        stroke={color}
        strokeWidth={width}
        lineCap="round"
      />
    );
  }

  const stroke = getStroke(points, { ...freehandOptionsBase, size: width });
  const pathData = getSvgPathFromStroke(stroke);
  return <Path key={lineId} data={pathData} fill={color} />;
}

export function renderPreviewShape(
  shape: Shapes,
  points: Point[],
  color: string,
  brushSize: number,
  key: string,
): ReactNode | null {
  if (points.length === 0) return null;

  if (shape === 'free-hand') {
    const stroke = getStroke(points, { ...freehandOptionsBase, size: brushSize });
    return <Path key={key} data={getSvgPathFromStroke(stroke)} fill={color} />;
  }

  if (points.length < 2) return null;

  const pseudo: Line = {
    lineId: key,
    color,
    points,
    shape,
    brushSize,
  };
  return renderLineToKonva(pseudo, brushSize);
}
