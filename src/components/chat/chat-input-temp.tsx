import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, ChevronDown, Sparkles, ArrowUp, BarChart, PieChart, LineChart, Table, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useChat } from '../../context/chat-context';
import type { VisualizationType } from '../../types';

export function ChatInputTemp() {
   const { sendMessage, isLoading } = useChat();
   const [input, setInput] = useState('');
   const [selectedMode, setSelectedMode] = useState<VisualizationType>('auto');
   const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (input.trim()) {
         sendMessage(input, selectedMode);
         setInput('');
         setSelectedMode('auto'); // Reset to auto after sending
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

   const getModeIcon = (mode: VisualizationType) => {
      switch (mode) {
         case 'table': return <Table className="min-h-5 min-w-5" />;
         case 'bar': return <BarChart className="min-h-5 min-w-5" />;
         case 'line': return <LineChart className="min-h-5 min-w-5" />;
         case 'pie': return <PieChart className="min-h-5 min-w-5" />;
         default: return <LayoutGrid className="min-h-5 min-w-5" />;
      }
   };

   const getModeLabel = (mode: VisualizationType) => {
      switch (mode) {
         case 'table': return 'Table';
         case 'bar': return 'Bar Graph';
         case 'line': return 'Line Graph';
         case 'pie': return 'Pie Chart';
         default: return 'Auto';
      }
   };

   return (
      <div className="absolute bottom-80 w-full max-w-4xl left-1/2 -translate-x-1/2 z-50">
         <div className="bg-secondary/90 backdrop-blur-sm border border-border/50 rounded-[30px] shadow-lg flex flex-col transition-all duration-200 focus-within:ring-2 focus-within:ring-ring/50 pr-2 pt-3">
            <Textarea
               ref={textareaRef}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Enter your message..."
               className="min-h-[68px] w-full resize-none bg-transparent border-none focus-visible:ring-0 px-4 py-2 placeholder:text-muted-foreground/70 custom-scrollbar"
               disabled={isLoading}
               rows={1}
            />

            <div className="flex items-center justify-between pb-3 pt-2 px-1">
               <div className="flex items-center gap-2 pl-2">
                  <Button
                     type="button"
                     variant="ghost"
                     size="icon"
                     className="h-10 w-10 rounded-full hover:bg-background/50"
                  >
                     <Paperclip className="min-h-5 min-w-5" />
                  </Button>

                  {/* Tools Dropdown Menu */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="h-10 rounded-full px-3 text-md font-medium hover:bg-background/50 gap-2"
                        >
                           {getModeIcon(selectedMode)}
                           {getModeLabel(selectedMode)}
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="start">
                        <DropdownMenuItem onSelect={() => setSelectedMode('auto')}>
                           <LayoutGrid className="mr-2 h-4 w-4" /> Auto
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedMode('table')}>
                           <Table className="mr-2 h-4 w-4" /> Table
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedMode('bar')}>
                           <BarChart className="mr-2 h-4 w-4" /> Bar Graph
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedMode('line')}>
                           <LineChart className="mr-2 h-4 w-4" /> Line Graph
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedMode('pie')}>
                           <PieChart className="mr-2 h-4 w-4" /> Pie Chart
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>

               <div className="flex items-center gap-2">
                  {/* Model Dropdown Menu */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="h-10 rounded-full px-3 text-md font-medium hover:bg-background/50 gap-2"
                        >
                           {selectedModel}
                           <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setSelectedModel('Gemini 2.5 Flash')}>
                           <Sparkles className="mr-2 h-4 w-4" />
                           <span>Gemini 2.5 Flash</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                     type="button"
                     size="icon"
                     variant="ghost"
                     className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-200 ${input.trim() ? 'bg-primary text-primary-foreground/80 hover:bg-primary/90 hover:text-primary-foreground/80' : 'text-muted-foreground hover:bg-background/50'}`}
                     onClick={() => handleSubmit()}
                     disabled={isLoading || !input.trim()}
                  >
                     <ArrowUp className="min-h-6 min-w-6 " />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
