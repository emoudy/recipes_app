import ChatDisplay from "@/(pages)/chat/components/ChatDisplay";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <ChatDisplay />
      </div>
    </div>
  );
}