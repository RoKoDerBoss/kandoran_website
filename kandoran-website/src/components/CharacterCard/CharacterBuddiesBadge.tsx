import React, { memo, useState, useMemo, useCallback, useRef, useEffect } from 'react';
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
    const buddiesRef = useRef<HTMLDivElement>(null);
    
    const buddiesArray = useMemo(() => {
        return typeof buddies === 'string' 
            ? buddies.split(', ').filter(buddy => buddy.trim() !== '') 
            : Array.isArray(buddies) ? buddies : [];
    }, [buddies]);

    const toggleBuddies = useCallback(() => {
        setShowBuddies(!showBuddies);
    }, [showBuddies]);
    
    const handleBuddyClick = useCallback((buddy: string) => {
        onBuddyClick?.(buddy);
    }, [onBuddyClick]);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        if (!showBuddies) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            if (buddiesRef.current && !buddiesRef.current.contains(event.target as Node)) {
                setShowBuddies(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showBuddies]);

    return (
        <div className={`${containerClassName} relative`}>
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
            
            {/* Buddies Content with Animation - Positioned absolutely but as dropdown */}
            {showBuddies && (
                <div 
                    ref={buddiesRef}
                    className="absolute left-0 top-full mt-1 w-full z-50 animate-in fade-in-0 zoom-in-95 duration-100"
                >
                    <div className="p-2 rounded-lg border bg-purple-50 shadow-lg">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 max-h-48 overflow-y-auto pr-1">
                            {buddiesArray.map((buddy, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => handleBuddyClick(buddy)}
                                    className="flex items-center text-xs py-1 px-1.5 rounded hover:bg-purple-100 cursor-pointer"
                                >
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-800 mr-1 sm:mr-1.5"></div>
                                    <span className="truncate text-gray-800 font-semibold text-xs sm:text-sm transition-text duration-300">{buddy}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
});

BuddiesSection.displayName = 'BuddiesSection';

export default BuddiesSection;
