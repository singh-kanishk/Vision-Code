 import {  
   FieldGroup,
   FieldLegend,
   FieldSet,
    
 } from "@/components/ui/field"
 import {
   Form,
   FormControl,
   FormMessage,
   FormField,
   FormItem,
   FormLabel,
 
 } from "@/components/ui/form"
 import { Input } from "@/components/ui/input"
 import { Button } from "@/components/ui/button"
 import { useForm} from 'react-hook-form'
 import { useState, useEffect } from 'react'
import { DrawerClose } from "@/components/ui/drawer"
import { socket } from "@/utils/socket-setup"
import type {roomFormValues, Lobby } from "@my-app/shared"
import { roomFormSchema } from "@my-app/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUserDataStore } from "@/store/useUserDataStore"
import { useLobbyStore } from "@/store/useLobbyStore"

export function JoinRoomForm(){
    const username = useUserDataStore((state) => state.username) || 'No Username'
    const setCurrentLobby = useUserDataStore((state) => state.setCurrentLobby)
    const setLobby = useLobbyStore((state) => state.setLobby)
    const [socketError, setSocketError] = useState<string | null>(null)

    useEffect(() => {
      function handleError(err: { message: string }) {
        setSocketError(err.message)
      }
      
      function handleSuccess(lobby: Lobby) {
        setCurrentLobby(lobby.roomId)
        setLobby(lobby)
        document.getElementById('drawer-close-join')?.click()
      }
      
      socket.on('error', handleError)
      socket.on('lobby_joined', handleSuccess)
      return () => {
        socket.off('error', handleError)
        socket.off('lobby_joined', handleSuccess)
      }
    }, [setCurrentLobby, setLobby])

    const methods = useForm<roomFormValues>({
          resolver: zodResolver(roomFormSchema),
        defaultValues: {
          roomId: "",
          passcode: "",
        },
        });

    function onSubmit(data:roomFormValues){
      setSocketError(null)
      socket.emit('join_lobby', { ...data, username })      
    }

    return (
    <Form {...methods}>
    <form className=" bg-amber-50 border-2 border-black p-6 w-100" onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldSet>
          <div className="flex justify-center w-full">
            <FieldLegend>Join Room</FieldLegend>
            </div>
            <FieldGroup>
          
        <FormField
          control={methods.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Id</FormLabel>
              <FormControl>
                {/* 'field' contains: { onChange, onBlur, value, ref } 
                   We spread it here so the Input gets all those props.
                */}
                <Input placeholder="Johndoe123" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         <FormField
          control={methods.control}
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passcode</FormLabel>
              <FormControl>
                {/* 'field' contains: { onChange, onBlur, value, ref } 
                   We spread it here so the Input gets all those props.
                */}
                <Input placeholder="secretOfJohnDoe123" type="password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
         {socketError && (
           <div className="text-red-500 text-sm font-semibold mb-2 text-center pb-2">
             {socketError}
           </div>
         )}
         <div className="flex flex-col gap-1">
        <Button name="submit" type="submit" className="hover:bg-gray-500">Join</Button>
        <DrawerClose asChild>
        <Button id="drawer-close-join" name="cancel" type="reset" className="bg-white text-black hover:bg-amber-100">Cancel</Button>
        </DrawerClose>
        </div>
        </FieldGroup>
        </FieldSet>
        <div className="flex w-full justify-center pt-2 pb-2">
        </div>
    </form>
    </Form>
)
}

