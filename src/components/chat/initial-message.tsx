import { useChat } from '../../context/chat-context';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ArrowUpRight, Image as ImageIcon, Layout, Map, Scale, TrendingUp } from 'lucide-react';

export function InitialMessage() {
   const { sendMessage } = useChat();

   const cards = [
      {
         id: '5',
         title: 'Market Analysis',
         subtitle: 'Real-time Data',
         prompt: 'Show me a candlestick chart for AAPL stock trends',
         className: 'col-span-2 row-span-1 bg-[#4ADE80] text-black',
         icon: <TrendingUp className="h-6 w-6 mb-2 opacity-80" />,
      },
      {
         id: '6',
         title: 'UI Generator',
         subtitle: 'React Components',
         prompt: 'Generate a responsive sign-up form with validation',
         className: 'col-span-1 row-span-1 bg-indigo-500 text-white',
         icon: <Layout className="h-6 w-6 mb-2 opacity-80" />,
      },
      {
         id: '1',
         title: 'Travel Planner',
         subtitle: 'Visual Itineraries',
         prompt: 'Plan a 3-day trip to Kyoto with an interactive map',
         className: 'col-span-1 row-span-2 bg-[#5D3A3A] text-white',
         icon: <Map className="h-6 w-6 mb-2 opacity-80" />,
      },
      {
         id: '2',
         title: 'User Management',
         subtitle: 'Active Members',
         prompt: 'Show me the table of recent users',
         className: 'col-span-1 row-span-1 bg-cover bg-center min-h-[160px] relative overflow-hidden group',
         backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)', // Team/Office vibe
         overlay: true,
      },
      {
         id: '3',
         title: 'Data Analytics',
         subtitle: 'Visual Insights',
         prompt: 'Analyze this sales data and visualize the quarterly trends',
         className: 'col-span-2 row-span-2 bg-cover bg-center min-h-[320px] relative overflow-hidden group',
         backgroundImage: 'url(https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Data/Tech vibe
         overlay: true,
      },
      {
         id: '4',
         title: 'Product Compare',
         subtitle: 'Specs Tables',
         prompt: 'Compare the specs of iPhone 15 Pro and Pixel 8 Pro',
         className: 'col-span-1 row-span-1 bg-[#FCD34D] text-black',
         icon: <Scale className="h-8 w-8 mb-2 opacity-80" />,
      },
   ];

   return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-40 overflow-y-auto">
         <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
            <div className="col-span-1 row-span-1 flex flex-col justify-center text-left p-6">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
               >
                  <h1 className="text-4xl font-serif font-medium tracking-tight mb-2">
                     Hello, <br />
                     <span className="text-muted-foreground">User</span>
                  </h1>
                  <p className="text-lg text-muted-foreground/80 leading-relaxed">
                     How can I help?
                  </p>
               </motion.div>
            </div>
            {cards.map((card, index) => (
               <motion.button
                  key={card.id}
                  layoutId={card.id}
                  onClick={() => sendMessage(card.prompt)}
                  className={cn(
                     "relative rounded-3xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md",
                     card.className
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={card.backgroundImage ? { backgroundImage: card.backgroundImage } : {}}
               >
                  {card.overlay && (
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  )}

                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div>
                        {card.icon}
                        {!card.backgroundImage && (
                           <h3 className="text-2xl font-medium leading-tight mb-1">
                              {card.title}
                           </h3>
                        )}
                     </div>

                     <div className="flex items-end justify-between">
                        <div>
                           {card.backgroundImage && (
                              <h3 className="text-xl font-medium text-white mb-1 drop-shadow-md">
                                 {card.title}
                              </h3>
                           )}
                           <p className={cn("text-sm font-medium opacity-90", card.backgroundImage ? "text-white/90 drop-shadow-md" : "")}>
                              {card.subtitle}
                           </p>
                        </div>
                        <div className={cn("rounded-full p-2", card.backgroundImage ? "bg-white/20 backdrop-blur-md text-white" : "bg-black/5 dark:bg-white/10")}>
                           <ArrowUpRight className="h-4 w-4" />
                        </div>
                     </div>
                  </div>
               </motion.button>
            ))}
         </div>
      </div>
   );
}
