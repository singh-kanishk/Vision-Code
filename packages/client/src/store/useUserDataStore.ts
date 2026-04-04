import { create } from "zustand";


export interface UserDataStoreInterface{
    name:string,
    isNameCreated:boolean,
    currentLobby:string|null


    setName:(name:string)=>void
    setCurrentLobby:(roomId:string)=>void
    setIsNameCreated:(what:boolean)=>void
}

export const useUserDataStore = create<UserDataStoreInterface>((set)=>(
    {
        name:'',
        currentLobby:null,
        isNameCreated:false,


        setName(name) {
            set({name})
        },
        setIsNameCreated(what) {
            set({isNameCreated:what})
        },
        setCurrentLobby(roomId) {
            set({currentLobby:roomId})
        },
    }
))