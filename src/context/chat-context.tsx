import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Message, VisualizationType } from '../types';
import { mockChatService } from '../services/mock-chat-service';

interface ChatContextType {
   messages: Message[];
   isLoading: boolean;
   sendMessage: (content: string, preferredFormat?: VisualizationType) => Promise<void>;
   clearChat: () => void;
   updateMessage: (messageId: string, updates: Partial<Message>) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const sendMessage = async (content: string, preferredFormat: VisualizationType = 'auto') => {
      const userMsg: Message = {
         id: Date.now().toString(),
         role: 'user',
         content,
         timestamp: Date.now(),
      };

      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      try {
         // Pass the current messages history to the service
         const response = await mockChatService.sendMessage(content, messages, preferredFormat);

         if (Array.isArray(response)) {
            setMessages(prev => [...prev, ...response]);
         } else {
            setMessages(prev => [...prev, response]);
         }
      } catch (error) {
         console.error("Failed to fetch response", error);
      } finally {
         setIsLoading(false);
      }
   };

   const updateMessage = (messageId: string, updates: Partial<Message>) => {
      setMessages(prev => prev.map(msg =>
         msg.id === messageId ? { ...msg, ...updates } : msg
      ));
   };

   const clearChat = () => {
      setMessages([]);
   };

   return (
      <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearChat, updateMessage }}>
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
