import { useState } from "react";
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
          {!gameStarted ? (
            <HeroSection onStartGame={handleStartGame} />
          ) : (
            <GameMap onQuestSelect={handleQuestSelect} />
          )}
        </main>

        {selectedQuest && (
          <QuestModal questId={selectedQuest} onClose={handleCloseModal} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
