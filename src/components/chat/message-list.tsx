import { useEffect, useRef } from 'react';
import type { Message } from '../../types';
import { MessageBubble } from './message-bubble';

interface MessageListProps {
   messages: Message[];
   isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
   const bottomRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, isLoading]);

   return (
      <div className="flex-1 overflow-y-auto p-4">
         <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
               <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
               <div className="flex justify-start mb-6">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none ml-10">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
               </div>
            )}
            <div ref={bottomRef} />
         </div>
      </div>
   );
}
