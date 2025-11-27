import { DynamicBarChart, DynamicLineChart, DynamicPieChart } from './charts';
import { DataTable } from './data-table';
import type { VisualizationData } from '../../types';

export function DynamicChart({ data }: { data: VisualizationData }) {
   const { type, data: chartData } = data;
   const { categories = [], series } = chartData;

   // Transform data for Recharts (Array of objects)
   // [{ name: 'Cat1', Series1: 10, Series2: 20 }, ...]
   const transformedData = categories.map((cat, index) => {
      const item: any = { name: cat };
      series.forEach(s => {
         item[s.name] = s.data[index];
      });
      return item;
   });

   switch (type) {
      case 'table':
         // Transform for DataTable
         const tableData = {
            headers: [chartData.metadata?.xAxisLabel || 'Category', ...series.map(s => s.name)],
            rows: categories.map((cat, i) => [
               cat,
               ...series.map(s => {
                  const val = s.data[i];
                  // Format value if currency or unit
                  if (chartData.metadata?.currency) return `${chartData.metadata.currency}${val}`;
                  if (chartData.metadata?.unit) return `${val}${chartData.metadata.unit}`;
                  return val.toString();
               })
            ])
         };
         return <DataTable data={tableData} />;

      case 'bar':
         return <DynamicBarChart data={transformedData} series={series} />;

      case 'line':
         return <DynamicLineChart data={transformedData} series={series} />;

      case 'pie':
         return <DynamicPieChart categories={categories} series={series} />;

      default:
         return <div>Unsupported chart type: {type}</div>;
   }
}
