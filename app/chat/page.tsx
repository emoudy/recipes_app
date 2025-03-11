import ChatSideNav from "@/chat/components/ChatSideNav";
import ChatDisplay from "@/chat/components/ChatDisplay";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar for Chat Sessions */}
      <ChatSideNav />
      
      {/* Chat Display Section */}
      <div className="flex-1 flex flex-col">
        <ChatDisplay />
      </div>
    </div>
  );
}