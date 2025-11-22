export function DataTable({ data }: { data: { headers: string[], rows: string[][] } }) {
   return (
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
               <tr>
                  {data.headers.map((header, i) => (
                     <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
               {data.rows.map((row, i) => (
                  <tr key={i}>
                     {row.map((cell, j) => (
                        <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                           {cell}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
