"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';
// Import shadcn components
import { Card, CardContent, CardFooter } from '@/components/ui/card';
// Import custom components
import Header from './CharacterHeader';
import AvatarBadge from './CharacterAvatar';
import NameRaceBadge from './CharacterNameRaceBadge';
import ClassBadge from './CharacterClassBadge';
import StatsBadge from './CharacterStatsBadge';
import BuddiesSection from './CharacterBuddiesBadge';

// Character data interface
interface CharacterData {
    id?: string;
    name?: string;
    race?: string;
    level?: number;
    class?: string;
    subclass?: string;
    secondary_class?: string;
    secondary_subclass?: string;
    gold?: number;
    status?: 'Active' | 'Inactive' | 'Dead' | string;
    exp?: number;
    games?: number;
    last_game?: string;
    buddies?: string | string[];
    player?: string;
    avatar_url?: string;
  }

// -----------------------------------------------------------
// CUSTOM COMPONENTS - imported from CharacterCard/
// -----------------------------------------------------------

// Header component
// Avatar component
// Name & Race component
// ClassBadge component
// StatsBadge component
// BuddiesBadge component

// -----------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------

interface CharacterCardProps {
    character?: CharacterData;
    className?: string;
    
}

export const CharacterCard = memo(({ character, className }: CharacterCardProps) => {
    // Extract character properties with defaults
  const {
    id,
    name = "Unknown",
    race = "",
    level = 1,
    class: Class = "",
    subclass = "",
    secondary_class = "",
    secondary_subclass = "",
    gold = 0,
    status = "Inactive",
    exp = 0,
    games = 0,
    last_game = "-",
    buddies = "",
    player = "",
    avatar_url = "https://www.dndbeyond.com/avatars/default/0.jpg"
  } = character || {};
    
    return (
        <Card className={cn(
            "min-w-[265px] max-w-[275px] sm:max-w-[315px] w-full p-2 bg-white overflow-visible hover:shadow-lg transition-transform duration-200 transform hover:-translate-y-0.5 -gap-4 h-auto",
            className
        )}>
            <CardContent className="-px-6 pt-6 bg-white space-y-1 sm:space-y-2 h-auto overflow-visible">
                {/* Card Header with Status, Level, and Avatar */}
                {/* Banner */}
                <Header 
                    level={level} 
                    status={status}  />
                {/* Avatar */}
                <AvatarBadge 
                    id={id}
                    avatar_url={avatar_url}
                    containerClassName="-mt-10 sm:-mt-12" />
                {/* Name & Race */}
                <NameRaceBadge 
                    name={name} 
                    race={race}  />
                {/* Class Badge */}
                <ClassBadge 
                    class={Class} 
                    subclass={subclass} 
                    secondary_class={secondary_class} 
                    secondary_subclass={secondary_subclass}  />
                {/* Stats Badge */}
                <StatsBadge 
                    games={games} 
                    exp={exp} 
                    gold={gold}  />
                {/* Last Game & Buddies */}
                <div className="relative overflow-visible">
                    <BuddiesSection 
                        lastGame={last_game} 
                        buddies={buddies} 
                        onBuddyClick={() => {}}  />
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-center border-t border-gray-200 mb-1 h-auto">
                {/* Player Name */}
                <div className="flex items-center justify-center w-full">
                    <span className="text-xs sm:text-sm font-medium text-gray-800 transition-text duration-300">Gespielt von: <span className="text-xs sm:text-sm font-bold text-purple-800 transition-text duration-300">{player}</span></span>
                </div>
            </CardFooter>
        </Card>
    )
});

CharacterCard.displayName = 'CharacterCard';