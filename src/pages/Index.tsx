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
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
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
                    duration: 0.6, 
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
