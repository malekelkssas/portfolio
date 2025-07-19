import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { GameMap } from "@/components/GameMap";
import { QuestModal } from "@/components/QuestModal";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleQuestSelect = (questId: string) => {
    setSelectedQuest(questId);
  };

  const handleCloseModal = () => {
    setSelectedQuest(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background particles */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <Header />
        
        <main className="pt-20 relative z-10">
          <AnimatePresence mode="wait">
            {!gameStarted ? (
              <motion.div
                key="hero"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  transition: { duration: 0.5, ease: "easeInOut" }
                }}
                transition={{ duration: 0.3 }}
              >
                <HeroSection onStartGame={handleStartGame} />
              </motion.div>
            ) : (
              <motion.div
                key="gameMap"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.8, 
                    ease: "easeOut",
                    delay: 0.2
                  }
                }}
                transition={{ duration: 0.3 }}
              >
                <GameMap onQuestSelect={handleQuestSelect} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {selectedQuest && (
            <QuestModal questId={selectedQuest} onClose={handleCloseModal} />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default Index;
