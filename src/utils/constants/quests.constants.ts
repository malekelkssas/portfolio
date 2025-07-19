import { QuestStatus, Quest } from "@/types";
import { User, Star, BookOpen, Briefcase, Code, Mail } from "lucide-react";
import { QuestsIds } from "@/types";

export const QUESTS: Quest[] = [
    {
      id: QuestsIds.ABOUT,
      title: "Character Profile",
      description: "Learn about the player's background and story",
      icon: User,
      status: QuestStatus.Available,
      position: { x: 20, y: 85 },
      connections: ["skills"]
    },
    {
      id: QuestsIds.SKILLS,
      title: "Skill Tree",
      description: "Explore the player's abilities and expertise",
      icon: Star,
      status: QuestStatus.Locked,
      position: { x: 50, y: 65 },
      connections: ["education", "experience"]
    },
    {
      id: QuestsIds.EDUCATION,
      title: "Academic Achievements",
      description: "Unlock educational milestones and certifications",
      icon: BookOpen,
      status: QuestStatus.Locked,
      position: { x: 25, y: 45 },
      connections: ["projects"]
    },
    {
      id: QuestsIds.EXPERIENCE,
      title: "Professional Quests",
      description: "Complete professional experience challenges",
      icon: Briefcase,
      status: QuestStatus.Locked,
      position: { x: 75, y: 45 },
      connections: ["projects"]
    },
    {
      id: QuestsIds.PROJECTS,
      title: "Code Missions",
      description: "Discover projects and technical achievements",
      icon: Code,
      status: QuestStatus.Locked,
      position: { x: 50, y: 25 },
      connections: ["contact"]
    },
    {
      id: QuestsIds.CONTACT,
      title: "Final Boss",
      description: "Establish connection and complete the journey",
      icon: Mail,
      status: QuestStatus.Locked,
      position: { x: 50, y: 10 }
    }
  ] as const;