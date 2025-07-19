import { MapPin, Lock, CheckCircle, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { QuestLegendProps } from "@/types";
import { useState } from "react";

export const QuestLegend = ({ className = "" }: QuestLegendProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-card/80 backdrop-blur-sm border border-border rounded-xl shadow-lg transition-all duration-300 ${className}`}>
      {/* Mobile: Collapsible header */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 text-left"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Legend</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Desktop: Always visible header */}
      <div className="hidden md:flex items-center space-x-2 p-4 pb-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h4 className="font-bold text-lg">Quest Legend</h4>
      </div>
      
      {/* Content - hidden on mobile when collapsed */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="p-3 md:p-4 md:pb-2">
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary animate-bounce" />
                <div className="absolute inset-0 w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full animate-ping opacity-20"></div>
              </div>
              <div>
                <span className="font-semibold text-xs md:text-sm">Available Quest</span>
                <p className="text-xs text-muted-foreground hidden md:block">Ready to explore</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                </div>
                <div className="absolute inset-0 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <div>
                <span className="font-semibold text-xs md:text-sm text-green-600">Completed</span>
                <p className="text-xs text-muted-foreground hidden md:block">Quest conquered</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-muted-foreground/30 rounded-full flex items-center justify-center">
                  <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <span className="font-semibold text-xs md:text-sm text-muted-foreground">Locked</span>
                <p className="text-xs text-muted-foreground hidden md:block">Complete prerequisites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connection legend */}
        <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-4 border-t border-border/20">
          <h5 className="font-semibold text-xs md:text-sm mb-2 md:mb-3 text-muted-foreground">Connection Types</h5>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="flex-1 h-0.5 md:h-1 bg-border rounded-full"></div>
              <span className="text-xs text-muted-foreground font-medium">Inactive Path</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="flex-1 h-0.5 md:h-1 bg-gradient-to-r from-green-500/50 via-green-500 to-green-500/50 rounded-full shadow-lg shadow-green-500/20"></div>
              <span className="text-xs text-green-600 font-medium">Completed Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 