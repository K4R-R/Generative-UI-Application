import { ModeToggle } from '../mode-toggle';

export function Header() {
   return (
      <header className="h-14 border-b border-border flex items-center justify-end px-4 bg-card/50 backdrop-blur-sm">
         <ModeToggle />
      </header>
   );
}
