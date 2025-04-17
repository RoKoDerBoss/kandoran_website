import React, { memo } from 'react';
import { Badge } from '../ui/badge';

// Header component
interface HeaderProps {
    level: number | string;
    status: string;
    containerClassName?: string;
}

const Header = memo(({
    level,
    status,
    containerClassName
}: HeaderProps) => {
    const statusColors = {
        Active: 'bg-emerald-500',
        Inactive: 'bg-yellow-500',
        Dead: 'bg-gray-500'
    };
    const statusDotColors = {
        Active: 'bg-green-700',
        Inactive: 'bg-amber-600',
        Dead: 'bg-gray-700'
    };
    
    return (
        <div className={containerClassName}>
            <div className="flex items-center justify-center w-full+4px h-auto -ml-2 -mr-2 -mt-8">
                {/* Banner Container */}
                <div className="flex items-center relative justify-between bg-gray-700 w-full h-auto">
                    {/* Dummy element */}
                    <div className="invisible relative py-7 sm:py-8"></div>
                    {/* Status Badge */}
                    <Badge 
                        variant="default" 
                        className={`p-1 sm:p-1.5 shadow-md absolute top-2 left-2 z-10 min-w-20 sm:min-w-23 rounded-lg ${statusColors[status as keyof typeof statusColors]}`}>
                        <div className="flex items-center justify-center space-x-1">
                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${statusDotColors[status as keyof typeof statusDotColors]}`} />
                            <span className="font-bold text-white text-[10px] sm:text-xs transition-text duration-300">{status}</span>
                        </div>
                    </Badge>
                    {/* Level Badge */}
                    <div className="flex flex-col items-center justify-center absolute top-0 right-0 z-10 bg-gray-500 p-1 sm:p-1.5 rounded-bl-lg">
                        <div className="flex flex-col items-center justify-center mx-2">
                            <span className="text-white font-normal text-[10px] sm:text-xs transition-text duration-300">LVL</span>
                            <span className="text-white font-bold text-base sm:text-xl transition-text duration-300">{level}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

Header.displayName = 'Header';

export default Header;
