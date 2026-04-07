import { Socket,Server } from "socket.io";
import { SendPointEventSchema,UndoLineSchema } from "@my-app/shared";
import { lobbies } from "./lobbies.js";


export function setCanvas(io:Server){
    io.on('connection',(socket:Socket)=>{
        socket.on('send_point',({roomId,point,flag,lineId,color,completeLine,strokeAborted}:SendPointEventSchema)=>{
            const lobby = lobbies.get(roomId);

            // Persist completed lines so the server-side lobby state stays consistent.
            if(flag==='end-point'&&completeLine&&lobby&&!strokeAborted){
                lobby.lines = [...lobby.lines, completeLine];
            }

            socket.to(roomId).emit('draw_line',{
                point: point ?? null,
                flag,
                lineId,
                color,
                ...(flag === 'end-point'
                    ? {
                        ...(completeLine ? { completeLine } : {}),
                        ...(strokeAborted ? { strokeAborted: true } : {}),
                    }
                    : {}),
            })
            
        })
        socket.on('undo_line',(obj:UndoLineSchema)=>{
            const lobby = lobbies.get(obj.roomId);
            if (lobby) {
                lobby.lines = lobby.lines.filter((line) => line.lineId !== obj.lineId);
            }
            socket.to(obj.roomId).emit('undo_line',{
                lineId:obj.lineId
            })
        })
        socket.on('send_clear_canvas',({roomId}:{roomId:string})=>{
            const lobby = lobbies.get(roomId);
            if (lobby) {
                lobby.lines = [];
            }
            socket.to(roomId).emit('clear_canvas')
        })
    })
    
   
}