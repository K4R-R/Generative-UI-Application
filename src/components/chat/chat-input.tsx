import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface ChatInputProps {
   onSend: (content: string) => void;
   disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
   const [input, setInput] = useState('');
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
         onSend(input);
         setInput('');
         // Reset height after sending
         if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
         }
      }
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         if (input.trim()) {
            onSend(input);
            setInput('');
            // Reset height after sending
            if (textareaRef.current) {
               textareaRef.current.style.height = 'auto';
            }
         }
      }
   };

   // Auto-resize textarea
   useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
         textarea.style.height = 'auto';
         const scrollHeight = textarea.scrollHeight;
         const maxHeight = 200; // Approximately 7-8 lines
         textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
      }
   }, [input]);

   return (
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
         <div className="relative flex items-end max-w-4xl mx-auto gap-2">
            <Button
               type="button"
               variant="ghost"
               size="icon"
               className="mb-1"
            >
               <Paperclip className="h-5 w-5" />
            </Button>
            <Textarea
               ref={textareaRef}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Ask anything..."
               className="min-h-[44px] resize-none overflow-y-auto"
               disabled={disabled}
               rows={1}
            />
            <Button
               type="submit"
               size="icon"
               className="absolute right-2 top-1/2 -translate-y-1/2"
               disabled={!input.trim() || disabled}
            >
               <Send className="h-5 w-5" />
            </Button>
         </div>
      </form>
   );
}
