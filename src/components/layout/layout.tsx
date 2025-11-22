import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';

export function Layout() {
   return (
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
         <Sidebar />
         <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 relative">
               <Outlet />
            </main>
         </div>
      </div>
   );
}
