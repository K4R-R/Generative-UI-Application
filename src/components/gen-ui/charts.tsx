import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
   BarChart, Bar
} from 'recharts';

export function SimpleLineChart({ data }: { data: any[] }) {
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
            <Line type="monotone" dataKey="value" stroke="#888" activeDot={{ r: 8 }} />
         </LineChart>
      </ResponsiveContainer>
   );
}

export function SimpleBarChart({ data }: { data: any[] }) {
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
            <Bar dataKey="value" fill="#666" />
         </BarChart>
      </ResponsiveContainer>
   );
}
