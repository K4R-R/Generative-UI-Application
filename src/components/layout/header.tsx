import { ModeToggle } from '../mode-toggle';

export function Header() {
   return (
      <header className="h-16 flex items-center justify-end px-4">
         <ModeToggle />
      </header>
   );
}
