import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/theme-provider"
import { motion } from "framer-motion"

export function ModeToggle() {
   const { setTheme, theme } = useTheme()

   const currentTheme = theme === 'system' ? 'dark' : theme;

   const toggleTheme = () => {
      setTheme(currentTheme === 'dark' ? "light" : "dark")
   }

   return (
      <button
         onClick={toggleTheme}
         className="relative inline-flex h-9 w-[4.5rem] items-center rounded-full bg-muted p-1 transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
         aria-label="Toggle theme"
      >
         <div className="absolute inset-0 z-10 flex w-full items-center">
            <div className="flex w-1/2 justify-center">
               <Sun className={`h-5 w-5 transition-colors duration-300 ${currentTheme === 'light' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex w-1/2 justify-center">
               <Moon className={`h-5 w-5 transition-colors duration-300 ${currentTheme === 'dark' ? 'text-blue-400' : 'text-muted-foreground'}`} />
            </div>
         </div>
         <motion.div
            className="absolute left-1 top-1 h-7 w-7 rounded-full bg-background shadow-sm"
            initial={false}
            animate={{
               x: currentTheme === 'dark' ? 36 : 0
            }}
            transition={{
               duration: 0.3,
               ease: "easeInOut"
            }}
         />
      </button>
   )
}
