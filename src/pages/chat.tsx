import { useState } from 'react';
import { MessageList } from '../components/chat/message-list';
import { ChatInput } from '../components/chat/chat-input';
import type { Message } from '../types';
import { mockChatService } from '../services/mock-chat-service';

export function ChatPage() {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const handleSend = async (content: string) => {
      const userMsg: Message = {
         id: Date.now().toString(),
         role: 'user',
         content,
         timestamp: Date.now(),
      };

      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      try {
         const response = await mockChatService.sendMessage(content);
         setMessages(prev => [...prev, response]);
      } catch (error) {
         console.error("Failed to fetch response", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
               <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome to GenUI Chat</h2>
               <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                  Ask me anything about stocks, sales, or data. I can generate charts and tables for you.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                  {['Show me Apple stock', 'Sales data for Q1', 'List active users', 'Compare revenue'].map((prompt) => (
                     <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="p-4 text-left border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 shadow-sm"
                     >
                        {prompt}
                     </button>
                  ))}
               </div>
            </div>
         ) : (
            <MessageList messages={messages} isLoading={isLoading} />
         )}
         <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
   );
}
