import { MessageSquare, Settings, LogOut, User, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Sidebar() {
   const navigate = useNavigate();
   const [isCollapsed, setIsCollapsed] = useState(false);

   // Get user email from localStorage and extract username
   const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
   const username = userEmail.split('@')[0];
   const displayName = username.charAt(0).toUpperCase() + username.slice(1);
   const initials = username.slice(0, 2).toUpperCase();

   const handleLogout = () => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      navigate('/login');
   };

   return (
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-card border-r border-border flex flex-col hidden md:flex transition-all duration-300`}>
         <div className="p-4 border-b border-border flex items-center justify-between">
            {!isCollapsed && <span className="font-bold text-lg">GenUI Chat</span>}
            <Button
               variant="ghost"
               size="icon"
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="ml-auto"
            >
               {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
         </div>
         <div className="flex-1 overflow-y-auto p-2 space-y-2">
            <Button
               variant="secondary"
               className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'}`}
            >
               <MessageSquare className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
               {!isCollapsed && 'New Chat'}
            </Button>

            {!isCollapsed && (
               <>
                  <div className="pt-4 pb-2">
                     <p className="text-xs font-semibold text-muted-foreground px-2">Recent</p>
                  </div>
                  <div className="space-y-1">
                     {['Previous conversation 1', 'Previous conversation 2', 'Previous conversation 3', 'Previous conversation 4', 'Previous conversation 5'].map((conv, idx) => (
                        <Button
                           key={idx}
                           variant="ghost"
                           className="w-full justify-start text-sm font-normal h-9 px-2"
                        >
                           <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                           <span className="truncate">{conv}</span>
                        </Button>
                     ))}
                  </div>
               </>
            )}
         </div>

         {/* User Profile Section */}
         <div className="p-4 border-t border-border">
            {!isCollapsed ? (
               <div className="mb-3">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold">
                        {initials}
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="mb-3 flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold">
                     {initials}
                  </div>
               </div>
            )}

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'}`}>
                     <Settings className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
                     {!isCollapsed && 'Settings'}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56" align="end" side="top">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <HelpCircle className="mr-2 h-4 w-4" />
                     <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Logout</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </aside>
   );
}
