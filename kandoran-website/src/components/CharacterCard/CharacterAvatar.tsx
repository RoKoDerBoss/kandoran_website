import React, { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';

// Avatar component
interface AvatarProps {
    avatar_url: string;
    containerClassName?: string;
    id?: string | null;
}

const AvatarBadge = memo(({
    avatar_url,
    containerClassName,
    id
}: AvatarProps) => {
    const dndBeyondUrl = `https://www.dndbeyond.com/characters/${id}`;
    return (
        <div className={containerClassName}>
            <div className="flex items-center justify-center w-full">
                {id ? (
                    <a 
                        href={dndBeyondUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block rounded-full overflow-hidden z-5 border-3 border-yellow-400 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer`}
                        title="View on D&D Beyond"
                    >
                        <Avatar className="w-22 h-22 sm:w-28 sm:h-28 transition-transform duration-300">
                        <AvatarImage src={avatar_url} alt="Character Avatar" loading="lazy" decoding="async" />
                        <AvatarFallback>
                            <User className="w-8 h-8 sm:w-16 sm:h-16 bg-purple-50 text-purple-600" />
                        </AvatarFallback>
                        </Avatar>
                    </a>
                    ) : (
                    <div className={`rounded-full bg-yellow-400 border-3 bg-white shadow-lg overflow-hidden`}>
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                        <AvatarImage src={avatar_url} alt="Character Avatar" loading="lazy" decoding="async" />
                        <AvatarFallback>
                            <User className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50" />
                        </AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </div>
        </div>
    )
});

AvatarBadge.displayName = 'AvatarBadge';

export default AvatarBadge;
