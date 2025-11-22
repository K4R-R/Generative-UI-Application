import type { Message } from '../types';

const MOCK_DELAY = 1000;

export const mockChatService = {
   sendMessage: async (content: string): Promise<Message> => {
      return new Promise((resolve) => {
         setTimeout(() => {
            const lowerContent = content.toLowerCase();
            let response: Message = {
               id: Date.now().toString(),
               role: 'assistant',
               content: 'I am not sure how to help with that.',
               timestamp: Date.now(),
            };

            if (lowerContent.includes('stock')) {
               response.content = 'Here is the stock performance for Apple (AAPL) over the last 6 months.';
               response.widgets = [
                  {
                     type: 'stock-card',
                     data: { symbol: 'AAPL', price: 150.25, change: 2.5, changePercent: 1.6 },
                  },
                  {
                     type: 'line-chart',
                     title: 'AAPL Price History',
                     data: [
                        { name: 'Jan', value: 130 },
                        { name: 'Feb', value: 145 },
                        { name: 'Mar', value: 140 },
                        { name: 'Apr', value: 155 },
                        { name: 'May', value: 150 },
                        { name: 'Jun', value: 165 },
                     ],
                  },
               ];
            } else if (lowerContent.includes('sales') || lowerContent.includes('revenue')) {
               response.content = 'Here is the sales data for Q1 and Q2.';
               response.widgets = [
                  {
                     type: 'bar-chart',
                     title: 'Monthly Sales',
                     data: [
                        { name: 'Jan', value: 4000 },
                        { name: 'Feb', value: 3000 },
                        { name: 'Mar', value: 2000 },
                        { name: 'Apr', value: 2780 },
                        { name: 'May', value: 1890 },
                        { name: 'Jun', value: 2390 },
                     ],
                  },
               ];
            } else if (lowerContent.includes('table') || lowerContent.includes('users')) {
               response.content = 'Here is the list of recent users.';
               response.widgets = [
                  {
                     type: 'table',
                     title: 'Recent Users',
                     data: {
                        headers: ['Name', 'Role', 'Status'],
                        rows: [
                           ['Alice Johnson', 'Admin', 'Active'],
                           ['Bob Smith', 'Editor', 'Offline'],
                           ['Charlie Brown', 'Viewer', 'Active'],
                           ['Diana Prince', 'Admin', 'Active'],
                        ],
                     },
                  },
               ];
            } else {
               response.content = `I received your message: "${content}". Try asking about "stocks", "sales", or "users" to see generative UI.`;
            }

            resolve(response);
         }, MOCK_DELAY);
      });
   },
};
