import { useState, useEffect } from "react";
import { GameMapProps, QuestStatus, Quest } from "@/types";
import { getQuestStatus } from "@/utils/game-map.utils";
import { QUESTS } from "@/utils/constants";
import { QuestNode, QuestConnections, QuestLegend, QuestProgress } from "./game-map";

export const GameMap = ({ onQuestSelect }: GameMapProps) => {
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const handleQuestClick = (quest: Quest) => {
    const status = getQuestStatus(quest, completedQuests);
    if (status !== QuestStatus.Locked) {
      onQuestSelect(quest.id);
      if (status === QuestStatus.Available) {
        setCompletedQuests(prev => [...prev, quest.id]);
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="quest-title">Quest Map</h2>
          <p className="text-xl text-muted-foreground">
            Choose your path and explore my professional journey
          </p>
        </div>

        <div className="quest-map-container relative w-full h-[600px] bg-card rounded-2xl border border-border p-8">
          {/* Floating particles */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}

          {/* Quest connections */}
          <QuestConnections quests={QUESTS} completedQuests={completedQuests} />

          {/* Quest nodes */}
          {QUESTS.map(quest => {
            const status = getQuestStatus(quest, completedQuests);
            
            return (
              <QuestNode
                key={quest.id}
                quest={quest}
                status={status}
                onClick={handleQuestClick}
              />
            );
          })}

          {/* Legend */}
          <QuestLegend className="absolute bottom-4 right-4" />
        </div>

        <div className="text-center mt-8">
          <QuestProgress 
            completedCount={completedQuests.length}
            totalCount={QUESTS.length}
          />
        </div>
      </div>
    </section>
  );
};