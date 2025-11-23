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
            } else if (lowerContent.includes('form') || lowerContent.includes('component') || lowerContent.includes('code') || lowerContent.includes('react')) {
               response.content = 'Here is the React component code for a sign-up form.';
               response.widgets = [
                  {
                     type: 'code-snippet',
                     title: 'SignUpForm.tsx',
                     data: {
                        language: 'tsx',
                        code: `export function SignUpForm() {
  return (
    <form className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Create Account</h2>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input type="email" className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input type="password" className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}`
                     },
                  },
               ];
            } else if (lowerContent.includes('trip') || lowerContent.includes('plan') || lowerContent.includes('map') || lowerContent.includes('kyoto')) {
               response.content = 'Here is a 3-day itinerary for Kyoto with key locations marked.';
               response.widgets = [
                  {
                     type: 'map-view',
                     title: 'Kyoto Itinerary',
                     data: { location: 'Kyoto, Japan' },
                  },
               ];
            } else if (lowerContent.includes('compare') || lowerContent.includes('specs')) {
               response.content = 'Here is a comparison table for the requested devices.';
               response.widgets = [
                  {
                     type: 'table',
                     title: 'Tech Specs Comparison',
                     data: {
                        headers: ['Feature', 'iPhone 15 Pro', 'Pixel 8 Pro'],
                        rows: [
                           ['Display', '6.1" OLED', '6.7" OLED'],
                           ['Processor', 'A17 Pro', 'Tensor G3'],
                           ['Camera', '48MP Main', '50MP Main'],
                           ['Battery', '3274 mAh', '5050 mAh'],
                        ],
                     },
                  },
               ];
            } else {
               response.content = `I received your message: "${content}". Try asking about "stocks", "code", "trips", or "compare" to see generative UI.`;
            }

            resolve(response);
         }, MOCK_DELAY);
      });
   },
};
