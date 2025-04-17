import React, { memo, useState, useMemo, useCallback } from 'react';
import { Calendar, Users, ChevronUp, ChevronDown } from 'lucide-react';

interface BuddiesSectionProps {
    buddies: string | string[];
    lastGame: string;
    onBuddyClick?: (buddy: string) => void;
    containerClassName?: string;
}

const BuddiesSection = memo(({
    buddies,
    lastGame,
    onBuddyClick,
    containerClassName
}: BuddiesSectionProps) => {
    const [showBuddies, setShowBuddies] = useState<boolean>(false);
    
    const buddiesArray = useMemo(() => {
        return typeof buddies === 'string' 
            ? buddies.split(', ').filter(buddy => buddy.trim() !== '') 
            : Array.isArray(buddies) ? buddies : [];
    }, [buddies]);

    const toggleBuddies = useCallback(() => {
        setShowBuddies(!showBuddies);
        //setShowBuddies(prev => !prev);
    }, [showBuddies]);
    
    const handleBuddyClick = useCallback((buddy: string) => {
        onBuddyClick?.(buddy);
    }, [onBuddyClick]);

    return (
        <div className={containerClassName}>
            <div className="flex justify-between items-center py-2">
                <div className={`flex items-center`}>
                <Calendar className={`mr-1 w-3 h-3 sm:w-4 sm:h-4 text-gray-600`} />
                <span className="text-[10px] sm:text-xs font-normal text-gray-600 transition-text duration-300">{lastGame}</span>
                </div>
                
                {/* Show Buddies Toggle only if buddies exist */}
                {buddiesArray.length > 0 && (
                <button 
                    onClick={toggleBuddies}
                    className={`flex items-center font-medium transition-colors duration-200 cursor-pointer`}
                >
                    <Users className={`mr-1 w-3 h-3 sm:w-4 sm:h-5 text-purple-800`} />
                    <div className="flex items-center space-x-1">
                        <span className="text-[10px] sm:text-xs font-semibold text-purple-800 transition-text duration-300">Buddies ({buddiesArray.length})</span>
                        <span className="transition-transform duration-300 ease-in-out transition-text duration-300">
                        {showBuddies ? 
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-800" /> : 
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-purple-800" />
                        }
                        </span>
                    </div>
                </button>
                )}
            </div>
            
            {/* Buddies Content with Animation */}
            <div 
                className={`
                transition-all duration-300 ease-in-out
                ${showBuddies ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}
                `}
            >
                {showBuddies && (
                <div className={`p-2 rounded-lg border transform transition-all mt-2 bg-purple-50`}>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 max-h-34 overflow-y-auto pr-1">
                    {buddiesArray.map((buddy, index) => (
                        <div 
                        key={index} 
                        onClick={() => handleBuddyClick(buddy)}
                        className={`flex items-center text-xs py-1 px-1.5 rounded transition-colors`}
                        >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-800 mr-1 sm:mr-1.5"></div>
                            <span className="truncate text-gray-800 font-semibold text-xs sm:text-sm transition-text duration-300">{buddy}</span>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
});

BuddiesSection.displayName = 'BuddiesSection';

export default BuddiesSection;
