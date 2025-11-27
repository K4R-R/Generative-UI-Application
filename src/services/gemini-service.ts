import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Message, VisualizationType, VisualizationData } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
   console.error('VITE_GEMINI_API_KEY is not set in .env');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

interface GeminiResponse {
   text: string;
   visualizationData?: VisualizationData;
   isFormatChange?: boolean;
   originalMessageId?: string; // ID of the message being reformatted
}

export const geminiService = {
   generateResponse: async (
      query: string,
      history: Message[],
      preferredFormat: VisualizationType
   ): Promise<GeminiResponse> => {
      try {
         // Construct prompt with history context
         const historyContext = history.slice(-5).map(msg =>
            `${msg.role.toUpperCase()}: ${msg.content} ${msg.visualizationData ? `[Has Data: ${JSON.stringify(msg.visualizationData)}]` : ''}`
         ).join('\n');

         const prompt = `
            You are a smart data assistant.
            Current Query: "${query}"
            Preferred Format: "${preferredFormat}"
            Conversation History:
            ${historyContext}

            Your task is to analyze the query and determine if it's a "Data Query" or a "Format Change Request".

            1. **Format Change Request**:
               - Look for phrases like "show this as a pie chart", "convert to table", "display as bar graph".
               - Check if the user is referring to previous data (e.g., "this", "that", "above").
               - Search the history for the most recent message with data.
               - If found, return the SAME data but with the NEW requested format.
               - If no data found in recent history, return a helpful text response explaining you can't find data to reformat.

            2. **Data Query**:
               - If the user asks for new data (e.g., "Show sales", "Market share"), generate realistic mock data.
               - Respect the "Preferred Format" unless the user explicitly mentions a format in the query (e.g., "Show sales as a pie chart" overrides "Auto").
               - If "Auto" is selected/implied, choose the best visualization:
                  - Pie: Single-series categorical (<= 6 categories).
                  - Line: Time-series data.
                  - Bar: Comparison or multi-series.
               - Generate a natural language explanation of the data.

            3. **General Conversation**:
               - If it's just "Hello" or "Help", return text only.

            **Output Format**:
            Return ONLY a JSON object with this structure:
            {
               "text": "Natural language explanation...",
               "visualizationData": {
                  "type": "table" | "bar" | "line" | "pie",
                  "title": "Chart Title",
                  "data": {
                     "categories": ["Cat1", "Cat2"],
                     "series": [
                        { "name": "Series1", "data": [10, 20] }
                     ],
                     "metadata": { "unit": "$", "xAxisLabel": "Time", "yAxisLabel": "Revenue" }
                  }
               },
               "isFormatChange": boolean, // True if user asked to reformat previous data
               "originalMessageId": string // ID of the message found in history (if format change)
            }
            
            If no visualization is needed, "visualizationData" should be null.
         `;

         const result = await model.generateContent(prompt);
         const response = result.response;
         const text = response.text();

         // Extract JSON from response (handle potential markdown code blocks)
         const jsonMatch = text.match(/\{[\s\S]*\}/);
         if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
         } else {
            console.error("Failed to parse Gemini response as JSON", text);
            return { text: "I'm sorry, I couldn't process that request." };
         }

      } catch (error) {
         console.error("Gemini API Error:", error);
         return { text: "Sorry, I encountered an error connecting to the AI service." };
      }
   }
};
