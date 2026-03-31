import { Socket, Server } from "socket.io";

import type { Lobby,User } from "@my-app/shared";
import { Line } from "@my-app/shared";

export const lobbies = new Map<string, Lobby>();

export function setupLobbies(io: Server) {
  io.on('connection', (socket: Socket) => {

  // 1. CREATE A LOBBY
  socket.on('create_lobby', (data: { roomId?: string , passcode?:string ,username?:string }) => {

    const username= data.username||`Player 1`
    const { passcode, roomId } = data || {};
    
    
    if (!roomId || !passcode ) {
      socket.emit('error', { message: 'Missing required fields' });
      return;
    }

    if (lobbies.has(roomId)) {
      socket.emit('error', { message: 'Room already exists' });
      return;
    }

    const newLobby: Lobby = {
      roomId,
      hostId: socket.id,
      users: [{ socketId: socket.id, username }],
      passcode,
      lines:[],
      status: 'waiting'
    };

    lobbies.set(roomId, newLobby);
    
    // Join the internal Socket.IO room
    socket.join(roomId);
    
    // Notify the creator
    socket.emit('lobby_created', newLobby);
  });

  // 2. JOIN A LOBBY
  socket.on('join_lobby', (data: { username?: string, roomId?: string, passcode?: string }) => {
    
    const {  roomId , passcode} = data || {};
    let username = data.username
    if (!roomId || !passcode) {
      socket.emit('error', { message: 'Missing required fields' });
      return;
    }

    const lobby = lobbies.get(roomId);

    if (!lobby) {
      socket.emit('error', { message: 'Lobby not found' });
      return;
    }

    if (lobby.passcode !== passcode) {
      socket.emit('error', { message: 'Incorrect passcode' });
      return;
    }

    if(!username){
      username = `Player ${lobby.users.length+1}`
    }
    // Add user to our in-memory state
    lobby.users.push({ socketId: socket.id, username });
    
    // Join the internal Socket.IO room
    socket.join(roomId);

    // Tell the user they joined successfully
    socket.emit('lobby_joined', lobby);
    
    // Broadcast to everyone else in the room that a new user joined
    socket.to(roomId).emit('user_joined', { 
      message: `${username} has joined the lobby`,
      users: lobby.users 
    });
  });

  // 3. HANDLE DISCONNECTS AND LEAVING
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // We need to find which room(s) the user was in to clean up our memory
    lobbies.forEach((lobby, roomId) => {
      const userIndex = lobby.users.findIndex(u => u.socketId === socket.id);
      
      if (userIndex !== -1) {
        // Remove the user from our state
        const [leftUser] = lobby.users.splice(userIndex, 1);
        
        // If the room is empty, delete it from memory
        if (lobby.users.length === 0) {
          lobbies.delete(roomId);
        } else {
          // If the host left, reassign host to the next person in line
          if (lobby.hostId === socket.id) {
            lobby.hostId = lobby.users[0].socketId;
            io.to(roomId).emit('host_changed', { newHostId: lobby.hostId });
          }
          
          // Notify remaining users
          io.to(roomId).emit('user_left', {
            message: `${leftUser.username} left the lobby`,
            users: lobby.users
          });
        }
      }
    });
  });
  });
}
export function getLobby(roomId:string){
  return lobbies.get(roomId)
}
