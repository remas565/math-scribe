import { ThemeToggle } from './ThemeToggle';
import { Sigma } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass glass-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary shadow-glow">
            <Sigma className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">MathTeX</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">AI Math OCR</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden md:block">
            Powered by AI
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
