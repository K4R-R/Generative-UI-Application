import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
   const { setTheme, theme } = useTheme()

   // If theme is system, resolve it to current effective theme or default to dark
   const currentTheme = theme === 'system' ? 'dark' : theme;

   return (
      <div className="flex items-center p-1 bg-gray-200 dark:bg-gray-800 rounded-full border dark:border-gray-700">
         <button
            onClick={() => setTheme("light")}
            className={`
          relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none
          ${currentTheme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}
        `}
            title="Light Mode"
         >
            <Sun className="h-4 w-4" />
            <span className="sr-only">Light</span>
         </button>
         <button
            onClick={() => setTheme("dark")}
            className={`
          relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none
          ${currentTheme === 'dark' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}
        `}
            title="Dark Mode"
         >
            <Moon className="h-4 w-4" />
            <span className="sr-only">Dark</span>
         </button>
      </div>
   )
}
