import { Button } from "@/components/ui/button";
import { useDrawingStore } from "@/store/useCanvasStore";


const COLORS = [
  '#1e1e1e',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ffa500',
];

export function ColorPallete(){

      const strokeColor = useDrawingStore((state) => state.strokeColor);
      const setStrokeColor = useDrawingStore((state) => state.setStrokeColor);
      const undo = useDrawingStore((state) => state.undo);
    

    return (
        <>
        {/* Color Palette and Controls */}
      <div className="flex flex-col p-2 gap-2 bg-gray-100 rounded-lg h-fit">
        <span className="text-l font-medium text-gray-700">Colors:</span>
        <div className="flex gap-1">
          {COLORS.map((color) => (
            <Button
              key={color}
              onClick={() => setStrokeColor(color)}
              className={`w-8 h-8 rounded border-2 transition-all ${
                strokeColor === color
                  ? 'border-gray-800 shadow-md scale-110'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <div>
        <Button
          onClick={undo}
          className=" px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors w-15"
        >
        Undo
        </Button>
        </div>
      </div>
        </>
    )
}