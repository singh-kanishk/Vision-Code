import { Socket,Server } from "socket.io";
import { MessageData } from "@my-app/shared";

export function setText(io:Server){

    io.on('connection',(socket:Socket)=>{
        socket.on('send_message',(obj:MessageData)=>{
            if(obj.message!=='')
            socket.to(obj.roomId||'').emit('get_message',{message:obj.message,username:obj.userName})
        })
    })

}