import { create } from "zustand";
import { type Lobby, type User } from "@my-app/shared";

interface LobbyStoreInterface {
    lobby: Lobby | null;
    setLobby: (lobby: Lobby) => void;
    updateUsers: (users: User[]) => void;
    setHost: (hostId: string) => void;
    clearLobby: () => void;
}

export const useLobbyStore = create<LobbyStoreInterface>((set) => ({
    lobby: null,
    setLobby: (lobby) => set({ lobby }),
    updateUsers: (users) => set((state) => ({ 
        lobby: state.lobby ? { ...state.lobby, users } : null 
    })),
    setHost: (hostId) => set((state) => ({
        lobby: state.lobby ? { ...state.lobby, hostId } : null
    })),
    clearLobby: () => set({ lobby: null })
}));
