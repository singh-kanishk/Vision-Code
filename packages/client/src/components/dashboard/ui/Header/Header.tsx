"use client"
import { LoginForm } from "@/components/form/LoginForm";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { RoomManagerDrawer } from "./RoomForm/RoomForm";
import { useUserDataStore } from "@/store/useUserDataStore";
import {Users} from 'lucide-react'


export function Header() {
  const isNameCreated = useUserDataStore((state)=>(state.isNameCreated))
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isNameCreated) {
      e.preventDefault(); 
      alert('Create UserName First');
    }
  }
  return (
    <div className="w-full h-12 flex justify-between items-center px-4 bg-secondary/10 dark:bg-secondary/20 border-b border-border">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <LoginForm/>
      <Drawer>
      <DrawerTrigger asChild onClick={onClick}>
        <Button variant="outline"> <Users/></Button>
      </DrawerTrigger>
      <RoomManagerDrawer/>
    </Drawer>
      
    </div>
  );
}
