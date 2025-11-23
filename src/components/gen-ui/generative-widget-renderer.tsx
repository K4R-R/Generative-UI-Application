import type { GenerativeWidget } from '../../types';
import { SimpleLineChart, SimpleBarChart } from './charts';
import { DataTable } from './data-table';
import { StockCard } from './stock-card';

export function GenerativeWidgetRenderer({ widget }: { widget: GenerativeWidget }) {
   return (
      <div className="my-4 p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
         {widget.title && <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{widget.title}</h3>}
         {widget.type === 'line-chart' && <SimpleLineChart data={widget.data} />}
         {widget.type === 'bar-chart' && <SimpleBarChart data={widget.data} />}
         {widget.type === 'table' && <DataTable data={widget.data} />}
         {widget.type === 'stock-card' && <StockCard data={widget.data} />}
         {widget.type === 'code-snippet' && (
            <div className="relative rounded-md bg-slate-950 p-4 overflow-x-auto">
               <div className="absolute top-2 right-2 text-xs text-slate-400">{widget.data.language}</div>
               <pre className="text-sm text-slate-50 font-mono">
                  <code>{widget.data.code}</code>
               </pre>
            </div>
         )}
         {widget.type === 'map-view' && (
            <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               <div className="text-center z-10">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-sm font-medium text-muted-foreground">Interactive Map: {widget.data.location}</p>
               </div>
            </div>
         )}
      </div>
   );
}
