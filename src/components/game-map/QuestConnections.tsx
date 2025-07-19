import { QuestConnectionsProps } from "@/types";
import { getQuestConnections } from "@/utils/game-map.utils";

export const QuestConnections = ({ quests, completedQuests = [] }: QuestConnectionsProps) => {
  const connections = getQuestConnections(quests);

  const isPathActive = (fromId: string, toId: string) => {
    // A path is active if both quests are completed (showing the full path)
    return completedQuests.includes(fromId) && completedQuests.includes(toId);
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        {/* Gradient definitions for connections */}
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--border))" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(var(--border))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--game-success))" stopOpacity="0.4" />
          <stop offset="50%" stopColor="hsl(var(--game-success))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--game-success))" stopOpacity="0.4" />
        </linearGradient>

        {/* Filter for glow effects */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {connections.map(({ from, to }) => {
        const isPath = isPathActive(from.id, to.id);
        
        let connectionClass = "quest-connection";
        let strokeColor = "url(#connectionGradient)";
        let strokeWidth = "2";
        let strokeDasharray = "5,5";
        let filter = "none";
        
        if (isPath) {
          // Full path completed - show as solid green
          connectionClass = "quest-connection active";
          strokeColor = "url(#pathGradient)";
          strokeWidth = "3";
          strokeDasharray = "none";
          filter = "url(#glow)";
        }
        
        return (
          <g key={`${from.id}-${to.id}`}>
            {/* Background connection for depth */}
            <line
              x1={`${from.position.x}%`}
              y1={`${from.position.y}%`}
              x2={`${to.position.x}%`}
              y2={`${to.position.y}%`}
              stroke="hsl(var(--border) / 0.2)"
              strokeWidth="4"
              strokeDasharray="8,8"
              className="quest-connection"
            />
            
            {/* Main connection */}
            <line
              x1={`${from.position.x}%`}
              y1={`${from.position.y}%`}
              x2={`${to.position.x}%`}
              y2={`${to.position.y}%`}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              className={connectionClass}
              filter={filter}
            />
            
            {/* Animated particles along completed paths */}
            {isPath && (
              <>
                <circle
                  cx={`${from.position.x}%`}
                  cy={`${from.position.y}%`}
                  r="2"
                  fill="hsl(var(--game-success))"
                  opacity="0.8"
                  className="particle"
                  style={{
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
                <circle
                  cx={`${to.position.x}%`}
                  cy={`${to.position.y}%`}
                  r="2"
                  fill="hsl(var(--game-success))"
                  opacity="0.8"
                  className="particle"
                  style={{
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}; 