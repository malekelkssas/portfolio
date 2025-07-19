import { Moon, Sun, Gamepad2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="w-8 h-8 text-primary glow-pulse" />
          <h1 className="text-xl font-bold text-gradient">GameDev Portfolio</h1>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
};