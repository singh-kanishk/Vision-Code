import { Header } from './ui/Header/Header';
import { Canvas } from './ui/Canvas/Canvas';
import { Players } from './ui/Players/Players';
import { ChatBox } from './ui/ChatBox/ChatBox';


export function Dashboard() {
  return (
    <div className="flex flex-col h-screen m-4">

      <Header />
      <div className="flex h-full m-4 gap-1">
        <div className="flex-1">
          <Players />
        </div>
        <div className="flex-1 border-b border-border">
          <Canvas />
        </div>
        <div className="w-1/4 border-l border-border">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
