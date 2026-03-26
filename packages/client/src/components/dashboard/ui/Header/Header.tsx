"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,

  DrawerTrigger,
} from "@/components/ui/drawer"
import { RoomManagerDrawer } from "./RoomForm/RoomForm";


export function Header() {
  return (
    <div className="w-full h-12 flex justify-between items-center px-4 bg-secondary/10 dark:bg-secondary/20 border-b border-border">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline"> <i className="fi fi-rr-users-alt"> </i></Button>
      </DrawerTrigger>
      <RoomManagerDrawer/>
    </Drawer>
      
    </div>
  );
}
