import type { Message, VisualizationType } from '../types';
import { geminiService } from './gemini-service';

export const mockChatService = {
   sendMessage: async (content: string, history: Message[], preferredFormat: VisualizationType = 'auto'): Promise<Message | Message[]> => {

      const response = await geminiService.generateResponse(content, history, preferredFormat);

      if (response.isFormatChange && response.originalMessageId && response.visualizationData) {
         // Logic for format change: Return a new message with the reformatted data
         // The frontend will handle displaying this "new" message which is actually a re-render of the data
         // But per requirements: "create a completely new user message... then create a new assistant response"

         // Actually, the requirement says: "create a completely new user message with their query, then create a new assistant response showing that same exact data but in the new format"
         // So we just return the new assistant message. The user message is already added by the context.

         return {
            id: Date.now().toString(),
            role: 'assistant',
            content: response.text,
            timestamp: Date.now(),
            visualizationData: response.visualizationData,
            currentFormat: response.visualizationData.type
         };
      }

      return {
         id: Date.now().toString(),
         role: 'assistant',
         content: response.text,
         timestamp: Date.now(),
         visualizationData: response.visualizationData,
         currentFormat: response.visualizationData?.type
      };
   },
};
