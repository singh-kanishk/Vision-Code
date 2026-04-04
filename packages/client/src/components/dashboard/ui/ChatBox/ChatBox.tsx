import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/store/useMessageStore";
import type { MessageData } from "@my-app/shared";
import {  useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormMessage,
   FormField,
   FormItem,
 
 } from "@/components/ui/form"
 import { Input } from "@/components/ui/input";
 import { socket } from "@/utils/socket-setup";
import { useUserDataStore } from "@/store/useUserDataStore";
import { useLobbyStore } from "@/store/useLobbyStore";
import { useEffect } from "react";

interface MessageInterface{
  message:string
}

export function ChatBox() {
  const messages= useMessageStore((state)=>(state.messages))
  const username= useUserDataStore((state)=>(state.name))
  const addMessage=useMessageStore((state)=>(state.sendMessage))
  const roomId= useLobbyStore((state)=>(state.lobby?.roomId))
  const methods = useForm<MessageInterface>()  
  const lobby= useLobbyStore((state)=>(state.lobby))
  function onSubmit(data:MessageInterface){
    if(lobby==null){
      alert ('Join Lobby First')
      methods.reset({message:''})
      return;
    }
    const obj:MessageData ={
      message:data.message,
      userName:username,
      roomId:roomId||''
    }
    socket.emit('send_message',obj)
    methods.reset({ message: '' });
  }
  useEffect(()=>{
    const handleReceivingMessage= (obj:MessageData)=>{
      addMessage({message:obj.message,userName:obj.userName})      
    }

    socket.on('get_message',handleReceivingMessage)
    return () => {
      socket.off('get_message', handleReceivingMessage);
    };
  },[addMessage])
  return (
    <div className="flex flex-col h-full w-full">
      <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
    <div className="p-2 border flex">
        <FormField
          control={methods.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Send Message" type="text" {...field}  />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </div>
      </form>
      </Form>
    <div className="w-full h-full gap-2 p-2 flex flex-col justify-items-start overflow-y-auto bg-gray-100 dark:bg-gray-800">
      {
      messages.map((message,index)=>(
        <div className="flex-col p-2 border " key={index}>
        <p className="text-xs">{message.userName}</p>
        <p className="text-sm text-muted-foreground">{message.message}</p>
      </div>
      
      ))
      }
    </div>
     </div>
  );
}
