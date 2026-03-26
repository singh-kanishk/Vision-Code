export function ChatBox() {
  return (
    <div className="w-full h-full flex flex-col bg-gray-100 dark:bg-gray-800">
      <div className="flex-1 p-2 overflow-y-auto">
        <p className="text-sm text-muted-foreground">No messages yet</p>
      </div>
      <div className="p-2 border-t border-border">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full px-3 py-2 border rounded-md focus:ring-ring focus:border-ring"
        />
      </div>
    </div>
  );
}
