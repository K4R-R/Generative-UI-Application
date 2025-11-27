import { useState } from 'react';
import type { Message, VisualizationType } from '../../types';
import { cn } from '../../lib/utils';
import { GenerativeWidgetRenderer } from '../gen-ui/generative-widget-renderer';
import { User, Bot, Table as TableIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, Info } from 'lucide-react';
import { DynamicChart } from '../gen-ui/dynamic-chart';
import { Button } from '../ui/button';
import { useChat } from '../../context/chat-context';

export function MessageBubble({ message }: { message: Message }) {
   const isUser = message.role === 'user';
   const { updateMessage } = useChat();
   const [isFormatChanging, setIsFormatChanging] = useState(false);
   const [showToast, setShowToast] = useState(false);

   const handleFormatChange = async (newFormat: VisualizationType) => {
      if (isFormatChanging || message.currentFormat === newFormat) return;

      setIsFormatChanging(true);
      // Simulate backend call
      await new Promise(resolve => setTimeout(resolve, 800));

      updateMessage(message.id, { currentFormat: newFormat });
      setIsFormatChanging(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
   };

   const effectiveVisualizationData = message.visualizationData ? {
      ...message.visualizationData,
      type: message.currentFormat || message.visualizationData.type
   } : undefined;

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

               {effectiveVisualizationData && (
                  <div className="mt-4 w-full overflow-hidden border rounded-lg p-4 bg-card">
                     <div className="mb-4">
                        <DynamicChart data={effectiveVisualizationData} />
                     </div>

                     <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                           <span className="text-xs text-muted-foreground font-medium">View as:</span>
                           <div className="flex bg-muted/50 rounded-lg p-1">
                              <Button
                                 variant={effectiveVisualizationData.type === 'table' ? 'secondary' : 'ghost'}
                                 size="sm"
                                 className="h-7 px-2"
                                 onClick={() => handleFormatChange('table')}
                                 disabled={isFormatChanging}
                              >
                                 <TableIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                 variant={effectiveVisualizationData.type === 'bar' ? 'secondary' : 'ghost'}
                                 size="sm"
                                 className="h-7 px-2"
                                 onClick={() => handleFormatChange('bar')}
                                 disabled={isFormatChanging}
                              >
                                 <BarChartIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                 variant={effectiveVisualizationData.type === 'line' ? 'secondary' : 'ghost'}
                                 size="sm"
                                 className="h-7 px-2"
                                 onClick={() => handleFormatChange('line')}
                                 disabled={isFormatChanging}
                              >
                                 <LineChartIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                 variant={effectiveVisualizationData.type === 'pie' ? 'secondary' : 'ghost'}
                                 size="sm"
                                 className="h-7 px-2"
                                 onClick={() => handleFormatChange('pie')}
                                 disabled={isFormatChanging}
                              >
                                 <PieChartIcon className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>

                        {showToast && (
                           <div className="flex items-center gap-1 text-xs text-green-600 animate-in fade-in slide-in-from-bottom-2">
                              <Info className="h-3 w-3" />
                              <span>Format changed to {effectiveVisualizationData.type} chart</span>
                           </div>
                        )}
                     </div>
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
