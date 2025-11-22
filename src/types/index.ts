export type Theme = 'dark' | 'light' | 'system';

export interface User {
   id: string;
   email: string;
   name: string;
}

export interface Message {
   id: string;
   role: 'user' | 'assistant';
   content: string;
   widgets?: GenerativeWidget[];
   timestamp: number;
}

export interface GenerativeWidget {
   type: 'line-chart' | 'bar-chart' | 'pie-chart' | 'table' | 'stock-card';
   title?: string;
   data: any;
}
