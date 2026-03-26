
import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  
} from "@/components/ui/drawer"
import { useState } from "react"
import { JoinRoomForm } from "./sub-form/JoinRoomForm";
import { CreateRoomForm } from "./sub-form/CreateRoomForm";


export function RoomManagerDrawer(){

    let [isJoin,setIsJoin] = useState<boolean>(true);
return (
    <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Join Or Create Room</DrawerTitle>
          </DrawerHeader>
          {isJoin?<JoinRoomForm/>:<CreateRoomForm/>}                         
          <DrawerFooter>
            
            <div className="flex justify-center">
            <p className="underline cursor-pointer" onClick={()=>{ isJoin? setIsJoin(false): setIsJoin(true) }}>{isJoin?'Create Room':'Join Room'}</p>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
)
}