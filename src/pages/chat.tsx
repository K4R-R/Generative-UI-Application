import { MessageList } from '../components/chat/message-list';
import { ChatInput } from '../components/chat/chat-input';
import { InitialMessage } from '../components/chat/initial-message';
import { useChat } from '../context/chat-context';

export function ChatPage() {
   const { messages } = useChat();

   return (
      <div className="flex flex-col h-[87vh] relative">
         {messages.length === 0 ? (
            <InitialMessage />
         ) : (
            <MessageList />
         )}
         <ChatInput />
      </div>
   );
}
