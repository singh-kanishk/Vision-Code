import { create } from "zustand";
import { type MessageData } from "@my-app/shared";

interface MessageStoreInterface{
    messages:MessageData[]
    sendMessage:(message:MessageData)=>void    
}

export const useMessageStore = create<MessageStoreInterface>((set)=>(
    {
        messages:[],
        sendMessage: (message)=>{
            set((state)=>({
                messages:[...state.messages,message]
            }))
        }
        
    }
))