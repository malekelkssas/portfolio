import { ComponentType } from "react";
import { QuestStatus } from "./enums";

export interface Position {
  x: number;
  y: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  status: QuestStatus;
  position: Position;
  connections?: string[];
}

export interface QuestConnection {
  from: string;
  to: string;
  fromPosition: Position;
  toPosition: Position;
}

export interface GameMapProps {
  onQuestSelect: (questId: string) => void;
}

export interface QuestNodeProps {
  quest: Quest;
  status: QuestStatus;
  onClick: (quest: Quest) => void;
}

export interface QuestConnectionsProps {
  quests: Quest[];
  completedQuests?: string[];
}

export interface QuestLegendProps {
  className?: string;
}

export interface QuestProgressProps {
  completedCount: number;
  totalCount: number;
  className?: string;
} 