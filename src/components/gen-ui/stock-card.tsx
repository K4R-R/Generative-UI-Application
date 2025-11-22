import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function StockCard({ data }: { data: { symbol: string, price: number, change: number, changePercent: number } }) {
   const isPositive = data.change >= 0;
   return (
      <Card className="w-64">
         <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{data.symbol}</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">${data.price.toFixed(2)}</div>
            <div className={`flex items-center mt-1 text-xs ${isPositive ? 'text-gray-400' : 'text-gray-500'}`}>
               {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
               {isPositive ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
            </div>
         </CardContent>
      </Card>
   );
}
