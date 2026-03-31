
import { Button } from "@/components/ui/button";
import { useHostDrawingStore } from "@/store/useUserCanvasStore";

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
  const undo = useHostDrawingStore((state) => state.undo);
  
  // Custom handler to safely grab the ID and pass it to your store
  const handleUndo = () => {
    // 1. Get the absolute latest lines array on-demand
    const currentLines = useHostDrawingStore.getState().lines;
    
    // 2. Find the last line safely
    const lastLine = currentLines.at(-1);
    
    // 3. If a line exists, pass its ID to your store's undo function
    if (lastLine?.lineId) {
      undo(lastLine.lineId);
    }
  };
      
  return (
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
        {/* Call our custom handler instead of undo directly */}
        <Button onClick={handleUndo}>
          Undo
        </Button>
      </div>
    </div>
  );
};