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
   visualizationData?: VisualizationData;
   currentFormat?: VisualizationType;
}

export type VisualizationType = 'auto' | 'table' | 'bar' | 'line' | 'pie';

export interface VisualizationData {
   type: VisualizationType;
   title?: string;
   data: {
      categories?: string[]; // For x-axis labels
      series: {
         name: string;
         data: number[];
         color?: string;
      }[];
      metadata?: {
         unit?: string;
         currency?: string;
         xAxisLabel?: string;
         yAxisLabel?: string;
      };
   };
}

export interface GenerativeWidget {
   type: 'line-chart' | 'bar-chart' | 'pie-chart' | 'table' | 'stock-card' | 'code-snippet' | 'map-view';
   title?: string;
   data: any;
}
