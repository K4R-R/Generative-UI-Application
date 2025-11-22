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
      </div>
   );
}
