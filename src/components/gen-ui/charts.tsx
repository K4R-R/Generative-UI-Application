import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
   BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function DynamicLineChart({ data, series }: { data: any[], series: any[] }) {
   return (
      <ResponsiveContainer width="100%" height={300}>
         <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
               contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
               itemStyle={{ color: '#fff' }}
            />
            <Legend />
            {series.map((s, index) => (
               <Line
                  key={s.name}
                  type="monotone"
                  dataKey={s.name}
                  stroke={s.color || COLORS[index % COLORS.length]}
                  activeDot={{ r: 8 }}
               />
            ))}
         </LineChart>
      </ResponsiveContainer>
   );
}

export function DynamicBarChart({ data, series }: { data: any[], series: any[] }) {
   return (
      <ResponsiveContainer width="100%" height={300}>
         <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
               contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
               itemStyle={{ color: '#fff' }}
            />
            <Legend />
            {series.map((s, index) => (
               <Bar
                  key={s.name}
                  dataKey={s.name}
                  fill={s.color || COLORS[index % COLORS.length]}
               />
            ))}
         </BarChart>
      </ResponsiveContainer>
   );
}

export function SimpleLineChart({ data }: { data: any[] }) {
   // Adapt simple data to dynamic chart format
   // Simple data: [{ name: 'Jan', value: 100 }, ...]
   // Dynamic expects series: [{ name: 'value' }]
   const series = [{ name: 'value', color: '#8884d8' }];
   return <DynamicLineChart data={data} series={series} />;
}

export function SimpleBarChart({ data }: { data: any[] }) {
   const series = [{ name: 'value', color: '#8884d8' }];
   return <DynamicBarChart data={data} series={series} />;
}

export function DynamicPieChart({ categories, series }: { categories: string[], series: any[] }) {
   return (
      <div className="flex flex-wrap justify-center gap-8">
         {series.map((s, _index) => {
            const pieData = categories.map((cat, i) => ({
               name: cat,
               value: s.data[i]
            }));

            return (
               <div key={s.name} className="flex flex-col items-center">
                  <h4 className="mb-2 text-sm font-medium">{s.name}</h4>
                  <div className="w-[300px] h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label
                           >
                              {pieData.map((_entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                           </Pie>
                           <Tooltip
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                              itemStyle={{ color: '#fff' }}
                           />
                           <Legend />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
