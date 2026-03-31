import { useHostDrawingStore } from "@/store/useUserCanvasStore"
import type{ SendPointEventSchema, UndoLineSchema } from "@my-app/shared"
import { socket } from "@/utils/socket-setup"

export function emitPoint(obj:SendPointEventSchema){
    const lineColor = obj.color ||useHostDrawingStore.getState().strokeColor 
    socket.emit('send_point', {...obj,color:lineColor})
    
}
export function emitUndoLine(obj:UndoLineSchema){
    socket.emit('undo_line',obj)
}
export function emitClearCanvas (roomId:string){
    socket.emit('send_clear_canvas',{roomId})
}