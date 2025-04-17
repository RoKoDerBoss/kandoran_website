import React, { memo } from 'react';

interface NameRaceProps {
    name: string;
    race: string;
    containerClassName?: string;
}

const NameRaceBadge = memo(({
    name,
    race,
    containerClassName
}: NameRaceProps) => {
    return (
        <div className={containerClassName}>
            <div className="flex flex-col items-center justify-center text-center w-full gap-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 max-w-full transition-text duration-300">{name}</h1>
                <h2 className="text-xs sm:text-sm font-small text-gray-500 max-w-full transition-text duration-300">{race}</h2>
            </div>
        </div>
    )
});

NameRaceBadge.displayName = 'NameRaceBadge';

export default NameRaceBadge;
