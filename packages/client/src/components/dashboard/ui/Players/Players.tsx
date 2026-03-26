import { useEffect } from 'react';
import { useLobbyStore } from '@/store/useLobbyStore';
import { socket } from '@/utils/socket-setup';
import type { User } from '@my-app/shared';

export function Players() {
  const { lobby, updateUsers, setHost } = useLobbyStore();

  useEffect(() => {
    function handleUserJoined(data: { message: string; users: User[] }) {
      updateUsers(data.users);
    }

    function handleUserLeft(data: { message: string; users: User[] }) {
      updateUsers(data.users);
    }

    function handleHostChanged(data: { newHostId: string }) {
      setHost(data.newHostId);
    }

    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);
    socket.on('host_changed', handleHostChanged);

    return () => {
      socket.off('user_joined', handleUserJoined);
      socket.off('user_left', handleUserLeft);
      socket.off('host_changed', handleHostChanged);
    };
  }, [updateUsers, setHost]);

  if (!lobby) {
    return (
      <div className="w-full h-full bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-border flex items-center justify-center backdrop-blur-sm">
        <span className="text-muted-foreground font-medium">Create or join a room to see players.</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white/40 dark:bg-gray-900/40 rounded-xl border border-border overflow-hidden backdrop-blur-md shadow-sm">
      <div className="p-4 border-b border-border bg-white/60 dark:bg-gray-800/60 sticky top-0 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Room ID
          </span>
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2 tracking-tight">
            {lobby.roomId}
          </h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider px-2 pb-1">
          Lobby Members ({lobby.users.length})
        </div>
        {lobby.users.map((user) => {
          const isHost = user.socketId === lobby.hostId;
          const isMe = user.socketId === socket.id;
          
          return (
            <div 
              key={user.socketId}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                isMe 
                  ? 'bg-blue-50/80 border border-blue-200 shadow-sm dark:bg-blue-900/20 dark:border-blue-800' 
                  : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${
                  isHost ? 'bg-gradient-to-br from-amber-200 to-orange-400 text-amber-950 ring-2 ring-amber-200/50' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200'
                }`}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm flex items-center gap-2 text-foreground">
                    {user.username}
                  </span>
                  {isMe && <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">You</span>}
                </div>
              </div>
              
              {isHost && (
                <div title="Lobby Host" className="text-amber-500 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 w-8 h-8 rounded-full shadow-sm">
                  <span className="text-xs">👑</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
