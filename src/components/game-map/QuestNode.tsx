import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestNodeProps, QuestStatus } from "@/types";
import { getQuestIcon, getQuestStyles, getButtonStyles } from "@/utils/game-map.utils";

export const QuestNode = ({ quest, status, onClick }: QuestNodeProps) => {
  const Icon = getQuestIcon(quest, status);
  const nodeStyles = getQuestStyles(status);
  const buttonStyles = getButtonStyles(status);

  return (
    <div
      className={nodeStyles}
      style={{
        left: `${quest.position.x}%`,
        top: `${quest.position.y}%`
      }}
      onClick={() => onClick(quest)}
    >
      <div className="relative group">
        {/* MapPin for available quests */}
        {status === QuestStatus.Available && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <MapPin className="w-5 h-5 text-primary animate-bounce" />
          </div>
        )}

        <Button
          variant={status === QuestStatus.Completed ? "default" : "outline"}
          size="lg"
          className={buttonStyles}
          disabled={status === QuestStatus.Locked}
        >
          <Icon className="w-8 h-8" />
        </Button>
        
        {/* Enhanced tooltip */}
        <div className="quest-tooltip">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-lg">{quest.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{quest.description}</p>
          <div className="mt-2 pt-2 border-t border-border/20">
            <span className="text-xs text-muted-foreground">
              {status === QuestStatus.Completed && "✓ Completed"}
              {status === QuestStatus.Available && "🎯 Available"}
              {status === QuestStatus.Locked && "🔒 Locked"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 