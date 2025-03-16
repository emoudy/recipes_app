'use client';
import { useState, useEffect } from "react";
import { format, isToday, isYesterday, subDays, parseISO } from "date-fns";
import {chatSessions} from "../../lib/placeholder-data";

export default function ChatList() {
  const [groupedChats, setGroupedChats] = useState<{ today: any[]; yesterday: any[]; previous: any[] }>({
    today: [],
    yesterday: [],
    previous: []
  });

  useEffect(() => {
    const today = new Date();
    const yesterdayDate = subDays(today, 1);

    const grouped = {
      today: chatSessions.filter(chat => isToday(parseISO(chat.created_at))),
      yesterday: chatSessions.filter(chat => isYesterday(parseISO(chat.created_at))),
      previous: chatSessions.filter(chat => parseISO(chat.created_at) < yesterdayDate),
    };

    setGroupedChats(grouped);
  }, []);

  return (
    <div className="w-1/4 min-w-[250px] max-w-[350px] bg-gray-900 text-white h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Chat Sessions</h2>

      {groupedChats.today.length > 0 && (
        <div>
          <h3 className="text-gray-400 text-sm mb-2">Today</h3>
          <ul>
            {groupedChats.today.map((chat) => (
              <li key={chat.chatSessionId} className="cursor-pointer p-2 hover:bg-gray-700 rounded">
                {chat.chatSessionName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {groupedChats.yesterday.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-400 text-sm mb-2">Yesterday</h3>
          <ul>
            {groupedChats.yesterday.map((chat) => (
              <li key={chat.chatSessionId} className="cursor-pointer p-2 hover:bg-gray-700 rounded">
                {chat.chatSessionName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {groupedChats.previous.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-400 text-sm mb-2">Previous 7 Days</h3>
          <ul>
            {groupedChats.previous.map((chat) => (
              <li key={chat.chatSessionId} className="cursor-pointer p-2 hover:bg-gray-700 rounded">
                {chat.chatSessionName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
