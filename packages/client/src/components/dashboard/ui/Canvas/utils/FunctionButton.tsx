import { Button } from "@/components/ui/button";
import { useLobbyStore } from "@/store/useLobbyStore";
import { useHostDrawingStore } from "@/store/useUserCanvasStore";
import { socket } from "@/utils/socket-setup";
import { Undo2 } from "lucide-react";


  export function FunctionButtons(){
    const undo = useHostDrawingStore((state) => state.undo);
    const clearCanvas = useHostDrawingStore((state)=>(state.clearCanvas))
    const roomId = useLobbyStore.getState().lobby?.roomId
  
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
  function handleClear(){
    clearCanvas();
    socket.emit('send_clear_canvas',{roomId})
  }

    return (
        <div className="flex gap-2">
        <Button onClick={handleUndo}><Undo2/></Button>
        
        <Button onClick={handleClear}>Clear</Button>
        </div>
    )
  }