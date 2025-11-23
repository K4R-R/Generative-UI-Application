import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Message } from '../types';
import { mockChatService } from '../services/mock-chat-service';

interface ChatContextType {
   messages: Message[];
   isLoading: boolean;
   sendMessage: (content: string) => Promise<void>;
   clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const sendMessage = async (content: string) => {
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

   const clearChat = () => {
      setMessages([]);
   };

   return (
      <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearChat }}>
         {children}
      </ChatContext.Provider>
   );
}

export function useChat() {
   const context = useContext(ChatContext);
   if (context === undefined) {
      throw new Error('useChat must be used within a ChatProvider');
   }
   return context;
}
