import { Trophy, Star } from "lucide-react";
import { QuestProgressProps } from "@/types";

export const QuestProgress = ({ completedCount, totalCount, className = "" }: QuestProgressProps) => {
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className={`inline-flex flex-col items-center space-y-4 bg-card border border-border rounded-xl px-8 py-6 shadow-lg ${className}`}>
      {/* Progress header */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Trophy className="w-6 h-6 text-primary" />
          {completedCount > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <span className="font-bold text-lg">
          Quest Progress
        </span>
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalCount }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < completedCount 
                  ? "text-yellow-500 fill-current animate-bounce" 
                  : "text-muted-foreground"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Completed: {completedCount}</span>
          <span>Total: {totalCount}</span>
        </div>
        <div className="game-progress w-full h-3 bg-muted rounded-full overflow-hidden border border-border">
          <div 
            className="game-progress-fill h-full rounded-full relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm font-semibold text-primary">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
      </div>

      {/* Achievement message */}
      {completedCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedCount === 1 && "🎉 First quest completed!"}
            {completedCount === totalCount && "🏆 All quests completed! You're a legend!"}
            {completedCount > 1 && completedCount < totalCount && `🎯 ${completedCount} quests conquered!`}
          </p>
        </div>
      )}
    </div>
  );
}; 