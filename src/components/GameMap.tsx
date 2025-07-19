import { useState } from "react";
import { 
  MapPin, 
  Lock, 
  CheckCircle, 
  Star, 
  BookOpen, 
  Briefcase, 
  Code, 
  Trophy,
  User,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

type QuestStatus = "locked" | "available" | "completed";

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: QuestStatus;
  position: { x: number; y: number };
  connections?: string[];
}

const quests: Quest[] = [
  {
    id: "about",
    title: "Character Profile",
    description: "Learn about the player's background and story",
    icon: User,
    status: "available",
    position: { x: 20, y: 80 },
    connections: ["skills"]
  },
  {
    id: "skills",
    title: "Skill Tree",
    description: "Explore the player's abilities and expertise",
    icon: Star,
    status: "locked",
    position: { x: 50, y: 60 },
    connections: ["education", "experience"]
  },
  {
    id: "education",
    title: "Academic Achievements",
    description: "Unlock educational milestones and certifications",
    icon: BookOpen,
    status: "locked",
    position: { x: 25, y: 40 },
    connections: ["projects"]
  },
  {
    id: "experience",
    title: "Professional Quests",
    description: "Complete professional experience challenges",
    icon: Briefcase,
    status: "locked",
    position: { x: 75, y: 40 },
    connections: ["projects"]
  },
  {
    id: "projects",
    title: "Code Missions",
    description: "Discover projects and technical achievements",
    icon: Code,
    status: "locked",
    position: { x: 50, y: 20 },
    connections: ["contact"]
  },
  {
    id: "contact",
    title: "Final Boss",
    description: "Establish connection and complete the journey",
    icon: Mail,
    status: "locked",
    position: { x: 50, y: 5 }
  }
];

export const GameMap = ({ onQuestSelect }: { onQuestSelect: (questId: string) => void }) => {
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const getQuestStatus = (quest: Quest): QuestStatus => {
    if (completedQuests.includes(quest.id)) return "completed";
    if (quest.id === "about") return "available";
    
    // Check if all prerequisite quests are completed
    const hasPrerequisites = quests.some(q => 
      q.connections?.includes(quest.id) && !completedQuests.includes(q.id)
    );
    
    return hasPrerequisites ? "locked" : "available";
  };

  const handleQuestClick = (quest: Quest) => {
    const status = getQuestStatus(quest);
    if (status !== "locked") {
      onQuestSelect(quest.id);
      if (status === "available") {
        setCompletedQuests(prev => [...prev, quest.id]);
      }
    }
  };

  const getQuestIcon = (quest: Quest) => {
    const status = getQuestStatus(quest);
    switch (status) {
      case "locked":
        return Lock;
      case "completed":
        return CheckCircle;
      default:
        return quest.icon;
    }
  };

  const getQuestStyles = (quest: Quest) => {
    const status = getQuestStatus(quest);
    const baseStyles = "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300";
    
    switch (status) {
      case "locked":
        return `${baseStyles} opacity-50 cursor-not-allowed`;
      case "completed":
        return `${baseStyles} text-game-success glow-pulse cursor-pointer`;
      case "available":
        return `${baseStyles} hover:scale-110 cursor-pointer`;
      default:
        return baseStyles;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Quest Map</h2>
          <p className="text-xl text-muted-foreground">
            Choose your path and explore my professional journey
          </p>
        </div>

        <div className="relative w-full h-[600px] bg-card rounded-2xl border border-border p-8">
          {/* Quest connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {quests.map(quest => 
              quest.connections?.map(connectionId => {
                const connectedQuest = quests.find(q => q.id === connectionId);
                if (!connectedQuest) return null;
                
                return (
                  <line
                    key={`${quest.id}-${connectionId}`}
                    x1={`${quest.position.x}%`}
                    y1={`${quest.position.y}%`}
                    x2={`${connectedQuest.position.x}%`}
                    y2={`${connectedQuest.position.y}%`}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })
            )}
          </svg>

          {/* Quest nodes */}
          {quests.map(quest => {
            const Icon = getQuestIcon(quest);
            const status = getQuestStatus(quest);
            
            return (
              <div
                key={quest.id}
                className={getQuestStyles(quest)}
                style={{
                  left: `${quest.position.x}%`,
                  top: `${quest.position.y}%`
                }}
                onClick={() => handleQuestClick(quest)}
              >
                <div className="relative group">
                  <Button
                    variant={status === "completed" ? "default" : "outline"}
                    size="lg"
                    className={`w-16 h-16 rounded-full p-0 ${
                      status === "available" ? "hover:bg-primary hover:text-primary-foreground" : ""
                    } ${status === "completed" ? "bg-game-success hover:bg-game-success" : ""}`}
                    disabled={status === "locked"}
                  >
                    <Icon className="w-8 h-8" />
                  </Button>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-48">
                    <h4 className="font-semibold mb-1">{quest.title}</h4>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Available Quest</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-game-success" />
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span>Locked</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-4 bg-card border border-border rounded-lg px-6 py-3">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              Progress: {completedQuests.length}/{quests.length} Quests Completed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};