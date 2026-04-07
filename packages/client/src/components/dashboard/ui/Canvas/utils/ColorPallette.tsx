
import { Button } from "@/components/ui/button";
import { useHostDrawingStore } from "@/store/useUserCanvasStore";
import { FunctionButtons } from "./FunctionButton";

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

export const ColorPallete = () => {
  const strokeColor = useHostDrawingStore((state) => state.strokeColor);
  const setStrokeColor = useHostDrawingStore((state) => state.setStrokeColor);      
 
      
  return (
    <div className="flex flex-col p-2 gap-2 bg-gray-100 rounded-lg h-fit">
      <span className="text-l font-medium text-gray-700">Colors:</span>
      
      <div className="flex gap-1">
        {COLORS.map((color) => (
          <Button
            key={color}
            onClick={() => setStrokeColor(color)}
            className={`w-8 h-8 rounded border-2 transition-all${
              strokeColor === color
                ? 'border-gray-800 shadow-md scale-110'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

        <FunctionButtons></FunctionButtons>
      
    </div>
  );
};