import { create } from "zustand";


export interface UserDataStoreInterface{
    username:string,
    userId:string,
    currentLobby:string|null


    setUserName:(username:string)=>void
    setUserId:(userId:string)=>void
    setCurrentLobby:(roomId:string)=>void
}

export const useUserDataStore = create<UserDataStoreInterface>((set)=>(
    {
        username:'',
        userId:'',
        currentLobby:null,

        setUserId(userId) {
            set({userId})
        },
        setUserName(username) {
            set({username})
        },
        setCurrentLobby(roomId) {
            set({currentLobby:roomId})
        },
    }
))