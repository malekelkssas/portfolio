import { 
  Lock, 
  CheckCircle
} from "lucide-react";
import { Quest, QuestStatus } from "@/types";
import { QUESTS } from "./constants";
import { QuestsIds } from "@/types";

export const getQuestStatus = (quest: Quest, completedQuests: string[]): QuestStatus => {
  if (completedQuests.includes(quest.id)) return QuestStatus.Completed;
  if (quest.id === QuestsIds.ABOUT) return QuestStatus.Available;
  
  // Check if all prerequisite quests are completed
  const hasPrerequisites = QUESTS.some(q => 
    q.connections?.includes(quest.id) && !completedQuests.includes(q.id)
  );
  
  return hasPrerequisites ? QuestStatus.Locked : QuestStatus.Available;
};

export const getQuestIcon = (quest: Quest, status: QuestStatus) => {
  switch (status) {
    case QuestStatus.Locked:
      return Lock;
    case QuestStatus.Completed:
      return CheckCircle;
    default:
      return quest.icon;
  }
};

export const getQuestStyles = (status: QuestStatus): string => {
  const baseStyles = "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300";
  
  switch (status) {
    case QuestStatus.Locked:
      return `${baseStyles} opacity-50 cursor-not-allowed`;
    case QuestStatus.Completed:
      return `${baseStyles} text-game-success glow-pulse cursor-pointer`;
    case QuestStatus.Available:
      return `${baseStyles} hover:scale-110 cursor-pointer`;
    default:
      return baseStyles;
  }
};

export const getButtonStyles = (status: QuestStatus): string => {
  const baseStyles = "w-16 h-16 rounded-full p-0";
  
  switch (status) {
    case QuestStatus.Available:
      return `${baseStyles} hover:bg-primary hover:text-primary-foreground`;
    case QuestStatus.Completed:
      return `${baseStyles} bg-game-success hover:bg-game-success`;
    default:
      return baseStyles;
  }
};

export const getQuestConnections = (quests: Quest[]) => {
  const connections: Array<{ from: Quest; to: Quest }> = [];
  
  quests.forEach(quest => {
    quest.connections?.forEach(connectionId => {
      const connectedQuest = quests.find(q => q.id === connectionId);
      if (connectedQuest) {
        connections.push({ from: quest, to: connectedQuest });
      }
    });
  });
  
  return connections;
}; 