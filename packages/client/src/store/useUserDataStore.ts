import { create } from "zustand";


export interface UserDataStoreInterface{
    name:string,
    
    currentLobby:string|null


    setName:(name:string)=>void
    setCurrentLobby:(roomId:string)=>void
}

export const useUserDataStore = create<UserDataStoreInterface>((set)=>(
    {
        name:'',
        currentLobby:null,

        
        setName(name) {
            set({name})
        },
        setCurrentLobby(roomId) {
            set({currentLobby:roomId})
        },
    }
))