import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, ChevronDown, Sparkles, Zap, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ChatInputProps {
   onSend: (content: string) => void;
   disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
   const [input, setInput] = useState('');
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
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
         handleSubmit();
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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
         <div className="bg-secondary/90 backdrop-blur-sm border border-border/50 rounded-[32px] shadow-lg flex flex-col transition-all duration-200 focus-within:ring-1 focus-within:ring-ring/50">
            <Textarea
               ref={textareaRef}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Ask Gemini"
               className="min-h-[52px] w-full resize-none bg-transparent border-none focus-visible:ring-0 px-6 py-4 text-base placeholder:text-muted-foreground/70"
               disabled={disabled}
               rows={1}
            />

            <div className="flex items-center justify-between px-4 pb-3 pt-1">
               <div className="flex items-center gap-2">
                  <Button
                     type="button"
                     variant="ghost"
                     size="icon"
                     className="h-9 w-9 rounded-full hover:bg-background/50"
                  >
                     <Paperclip className="h-5 w-5" />
                  </Button>

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="h-9 rounded-full px-3 text-sm font-medium hover:bg-background/50 gap-2"
                        >
                           <Sparkles className="h-4 w-4" />
                           Tools
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="start">
                        <DropdownMenuItem>Code Interpreter</DropdownMenuItem>
                        <DropdownMenuItem>Image Generation</DropdownMenuItem>
                        <DropdownMenuItem>Web Search</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>

               <div className="flex items-center gap-2">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="h-9 rounded-full px-3 text-sm font-medium hover:bg-background/50 gap-2"
                        >
                           Fast
                           <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                           <Zap className="mr-2 h-4 w-4" />
                           <span>Fast (Gemini Flash)</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <Sparkles className="mr-2 h-4 w-4" />
                           <span>Pro (Gemini Pro)</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                     type="button"
                     size="icon"
                     variant="ghost"
                     className={`h-10 w-10 rounded-full transition-all duration-200 ${input.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:bg-background/50'}`}
                     onClick={() => handleSubmit()}
                     disabled={disabled || !input.trim()}
                  >
                     <Send className="h-5 w-5" />
                  </Button>
               </div>
            </div>
         </div>
         <div className="text-center mt-2">
            <p className="text-xs text-muted-foreground">Gemini can make mistakes, so double-check it</p>
         </div>
      </div>
   );
}
