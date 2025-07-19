import { ArrowDown, Shield, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = ({ onStartGame }: { onStartGame: () => void }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-game-primary-glow rounded-full flex items-center justify-center glow-pulse">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-game-warning rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-up">
          <span className="text-gradient">Player One</span>
          <br />
          <span className="text-foreground">Ready?</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 slide-up">
          Welcome to my interactive portfolio game! Complete quests, unlock achievements, 
          and discover my professional journey through an engaging gaming experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-up">
          <Button
            onClick={onStartGame}
            size="lg"
            className="game-button text-lg px-8 py-4"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Start Game
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Leaderboard
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full float-animation opacity-60"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-game-accent rounded-full float-animation opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-game-success rounded-full float-animation opacity-50" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};