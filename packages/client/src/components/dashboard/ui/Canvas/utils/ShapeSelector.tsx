import { useHostDrawingStore } from '@/store/useUserCanvasStore';
import type { Shapes } from '@my-app/shared';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SHAPE_OPTIONS: { value: Shapes; icon: string }[] = [
  { value: 'free-hand', icon: 'pencil' },
  { value: 'rectangle', icon: 'square' },
  { value: 'circle', icon: 'circle' },
  { value: 'line', icon: 'slash' },
];

function brushSizeFromSlider(sliderValue: number) {
  return Math.max(2, Math.round(4 + (sliderValue / 100) * 36));
}

function sliderFromBrushSize(size: number) {
  return Math.round(((size - 4) / 36) * 100);
}

export function ShapeSelector() {
  const selected = useHostDrawingStore((s) => s.selected);
  const setSelected = useHostDrawingStore((s) => s.setSelected);
  const brushSize = useHostDrawingStore((s) => s.brushSize);
  const setBrushSize = useHostDrawingStore((s) => s.setBrushSize);

  const sliderValue = [
    Math.min(100, Math.max(0, sliderFromBrushSize(brushSize))),
  ];

  return (
    <div className="flex flex-col p-2 gap-2 bg-gray-100 rounded-lg h-fit min-w-full">
      <span className="text-l font-medium text-gray-700">Shape:</span>
      <ToggleGroup
        type="single"
        value={selected}
        onValueChange={(v) => {
          if (v) setSelected(v as Shapes);
        }}
        className="flex"
        spacing={2}
        size="lg"
      >
        {SHAPE_OPTIONS.map(({ value, icon }) => (
          <ToggleGroupItem key={value} value={value} className="text-3xl">
            <i className={`fi fi-rr-${icon}`} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex items-center gap-2">
          <Slider
            value={sliderValue}
            onValueChange={(v) => setBrushSize(brushSizeFromSlider(v[0]))}
            min={0}
            max={100}
            step={1}
          />
          <span className="tabular-nums text-sm text-gray-600 w-8">
            {brushSize}
          </span>
        </div>
      </div>
    </div>
  );
}
