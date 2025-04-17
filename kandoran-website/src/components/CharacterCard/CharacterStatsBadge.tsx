import { Crown, Sparkles, Coins } from 'lucide-react';
import React, { memo } from 'react';

interface StatsBadgeProps {
    games: number;
    exp: number;
    gold: number;
    containerClassName?: string;
}

const StatBox = memo(({
  icon: Icon,
  iconClassName,
  label, 
  value
}: {
  icon: React.ElementType;
  iconClassName?: string;
  label: string;
  value: number | string;
}) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 py-1 bg-gray-50 min-w-18 sm:min-w-20">
            <div className="flex items-center justify-center mb-1">
                <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 ${iconClassName}`} />
                <span className={"text-[10px] sm:text-sxs font-normal transition-text duration-300"}>{label}</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-purple-800 transition-text duration-300">{value}</span>
        </div>
    )
});

StatBox.displayName = 'StatBox';

export const StatsBadge: React.FC<StatsBadgeProps> = memo(({ 
    games, 
    exp, 
    gold, 
    containerClassName
}) => {    
    return (
        <div className={containerClassName}>
            <div className="flex items-center justify-center">
                <div className="flex gap-1 sm:gap-2 w-1/3 justify-center transition-transform duration-300">
                    <StatBox icon={Crown} label="GAMES" value={games} iconClassName="text-green-500" />
                    <StatBox icon={Sparkles} label="EXP" value={exp} iconClassName="text-blue-500" />
                    <StatBox icon={Coins} label="GOLD" value={gold} iconClassName="text-yellow-500" />
                </div>
            </div>
        </div>
    )
});

StatsBadge.displayName = 'StatsBadge';

export default StatsBadge;
