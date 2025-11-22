import type { Message } from '../../types';
import { cn } from '../../lib/utils';
import { GenerativeWidgetRenderer } from '../gen-ui/generative-widget-renderer';
import { User, Bot } from 'lucide-react';

export function MessageBubble({ message }: { message: Message }) {
   const isUser = message.role === 'user';

   return (
      <div className={cn("flex w-full mb-6", isUser ? "justify-end" : "justify-start")}>
         <div className={cn("flex w-full", isUser ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
               "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
               isUser ? "ml-3 bg-muted" : "mr-3 bg-muted"
            )}>
               {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={cn("flex flex-col min-w-0", isUser ? "max-w-[70%]" : "flex-1")}>
               {isUser ? (
                  <div className="p-3 rounded-lg text-sm whitespace-pre-wrap break-words bg-secondary border border-border">
                     {message.content}
                  </div>
               ) : (
                  <div className="text-sm whitespace-pre-wrap break-words">
                     {message.content}
                  </div>
               )}

               {message.widgets && message.widgets.length > 0 && (
                  <div className="mt-4 space-y-4 w-full overflow-hidden">
                     {message.widgets.map((widget, index) => (
                        <GenerativeWidgetRenderer key={index} widget={widget} />
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
