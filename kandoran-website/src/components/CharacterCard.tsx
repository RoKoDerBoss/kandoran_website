"use client";

import React, { useState } from 'react';
import { 
    Crown,
    Sparkles,
    Calendar,
    Users,
    User,
    ChevronDown,
    ChevronUp,
    Coins,
    Icon as LucideIcon,
  } from 'lucide-react';

  // Import class icons
import { getClassIcon } from '@/lib/utils/classIcons';

// Import shadcn components
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
// CUSTOM COMPONENTS
// -----------------------------------------------------------

// Header component
interface HeaderProps {
    level: number | string;
    status: string;
    containerClassName?: string;
}

const Header = ({
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
                    <div className="invisible relative py-6 sm:py-8"></div>
                    {/* Status Badge */}
                    <Badge 
                        variant="default" 
                        className={`p-1 sm:p-1.5 shadow-md absolute top-0 left-0 z-10 ml-2 mt-2 min-w-20 sm:min-w-23 rounded-lg ${statusColors[status as keyof typeof statusColors]}`}>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ml-1 animate-pulse ${statusDotColors[status as keyof typeof statusDotColors]}`} />
                        <span className="mr-2 font-bold text-white text-[10px] sm:text-xs transition-all duration-300">{status}</span>
                    </Badge>
                    {/* Level Badge */}
                    <div className="flex flex-col items-center justify-center absolute top-0 right-0 z-10 bg-gray-500 p-1 sm:p-1.5 rounded-bl-lg">
                        <span className="text-white font-normal text-[10px] sm:text-xs transition-all duration-300 -mb-1 px-2">LVL</span>
                        <span className="text-white font-bold text-base sm:text-xl transition-all duration-300">{level}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Avatar component
interface AvatarProps {
    avatar_url: string;
    containerClassName?: string;
    id?: string | null;
}

const AvatarBadge = ({
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
                        <Avatar className="w-22 h-22 sm:w-28 sm:h-28 transition-all duration-300">
                        <AvatarImage src={avatar_url} alt="Character Avatar" />
                        <AvatarFallback>
                            <User className="w-8 h-8 sm:w-16 sm:h-16 bg-purple-50 text-purple-600" />
                        </AvatarFallback>
                        </Avatar>
                    </a>
                    ) : (
                    <div className={`rounded-full bg-yellow-400 border-3 bg-white shadow-lg overflow-hidden`}>
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                        <AvatarImage src={avatar_url} alt="Character Avatar" />
                        <AvatarFallback>
                            <User className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-50" />
                        </AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </div>
        </div>
    )
}

// Name & Race component
interface NameRaceProps {
    name: string;
    race: string;
    containerClassName?: string;
}

const NameRaceBadge = ({
    name,
    race,
    containerClassName
}: NameRaceProps) => {
    return (
        <div className={containerClassName}>
            <div className="flex flex-col items-center justify-center w-full gap-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 transition-all duration-300">{name}</h1>
                <h2 className="text-xs sm:text-sm font-small text-gray-500 transition-all duration-300">{race}</h2>
            </div>
        </div>
    )
}

// ClassBadge component
interface ClassBadgeProps {
    class: string;
    subclass?: string;
    secondary_class?: string;
    secondary_subclass?: string;
    containerClassName?: string;
}

const ClassBox = ({
    class: Class,
    subclass
}: ClassBadgeProps) => {
    const Icon = getClassIcon(Class);
    return (
        <div className="flex items-center justify-center border border-gray-300 rounded-md p-2 bg-purple-50 min-w-22 w-1/2 h-full flex-1 transition-all duration-300">
            <div className="flex items-center justify-center">
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 mr-2 transition-all duration-300" />
            </div>
            <div className="flex flex-col items-left justify-center overflow-hidden">
                <span className="text-xs sm:text-sm font-bold text-purple-800 transition-all duration-300 truncate">{Class}</span>
                <span className="text-[10px] sm:text-xs font-small text-gray-600 transition-all duration-300 truncate">{subclass ? subclass : "-"}</span>
            </div>
        </div>
    )
}

export const ClassBadge = ({
    class: Class,
    subclass,
    secondary_class,
    secondary_subclass,
    containerClassName
}: ClassBadgeProps) => {
    return (
        <div className={`w-full ${containerClassName}`}>
            <div className="flex items-stretch justify-center -mr-2 sm:mr-0 -ml-2 sm:ml-0 transition-all duration-300">
                <div className="flex items-stretch justify-center gap-1 sm:gap-2 p-1 sm:p-0 w-full min-w-full">
                    <ClassBox class={Class} subclass={subclass} />
                    {secondary_class && <ClassBox class={secondary_class} subclass={secondary_subclass || ""} />}
                </div>
            </div>
        </div>
    )
}

// StatsBadge component
interface StatsBadgeProps {
    games: number;
    exp: number;
    gold: number;
    containerClassName?: string;
}

const StatBox = ({
  icon: Icon,
  iconClassName,
  label, 
  value
}: {
  icon: React.ElementType;
  iconClassName?: string;
  label: string;
  value: number | string;
}) => (
    <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 p-1 bg-gray-50 min-w-18 sm:min-w-20 transition-all duration-300">
        <div className="flex items-center justify-center mb-1">
            <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 ${iconClassName}`} />
            <span className={"text-[10px] sm:text-sxs font-normal transition-all duration-300"}>{label}</span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-purple-800 transition-all duration-300">{value}</span>
    </div>
)

export const StatsBadge: React.FC<StatsBadgeProps> = ({ 
    games, 
    exp, 
    gold, 
    containerClassName
}) => {    
    return (
        <div className={containerClassName}>
            <div className="flex items-center justify-center transition-all duration-300">
                <div className="flex gap-1 sm:gap-2 p-0 sm:p-1 w-1/3 justify-center">
                    <StatBox icon={Crown} label="GAMES" value={games} iconClassName="text-green-500" />
                    <StatBox icon={Sparkles} label="EXP" value={exp} iconClassName="text-blue-500" />
                    <StatBox icon={Coins} label="GOLD" value={gold} iconClassName="text-yellow-500" />
                </div>
            </div>
        </div>
    )
}

// BuddiesBadge component
interface BuddiesSectionProps {
    buddies: string | string[];
    lastGame: string;
    onBuddyClick?: (buddy: string) => void;
    containerClassName?: string;
}

const BuddiesSection = ({
    buddies,
    lastGame,
    onBuddyClick,
    containerClassName
}: BuddiesSectionProps) => {
    const [showBuddies, setShowBuddies] = useState<boolean>(false);
    const buddiesArray = typeof buddies === 'string' 
      ? buddies.split(', ').filter(buddy => buddy.trim() !== '') 
      : Array.isArray(buddies) ? buddies : [];
    return (
        <div className={containerClassName}>
            <div className="flex justify-between items-center p-2 -mr-2 sm:mr-0 -ml-2 sm:ml-0 transition-all duration-300">
                <div className={`flex items-center`}>
                <Calendar className={`mr-1 w-3 h-3 sm:w-4 sm:h-4 text-gray-600`} />
                <span className="text-[10px] sm:text-xs font-normal text-gray-600 transition-all duration-300">{lastGame}</span>
                </div>
                
                {/* Show Buddies Toggle only if buddies exist */}
                {buddiesArray.length > 0 && (
                <button 
                    onClick={() => setShowBuddies(!showBuddies)}
                    className={`flex items-center font-medium transition-colors duration-200 cursor-pointer`}
                >
                    <Users className={`mr-1 w-3 h-3 sm:w-4 sm:h-5 text-purple-800`} />
                    <span className="text-[10px] sm:text-xs font-semibold text-purple-800 transition-all duration-300">Buddies ({buddiesArray.length})</span>
                    <span className="transition-transform duration-300 ease-in-out ml-1">
                    {showBuddies ? 
                        <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-800" /> : 
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-purple-800" />
                    }
                    </span>
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
                <div className={`p-2 rounded-lg border transform transition-all mt-2 ml-0 sm:ml-2 mr-0 sm:mr-2 bg-purple-50`}>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 max-h-34 overflow-y-auto pr-1">
                    {buddiesArray.map((buddy, index) => (
                        <div 
                        key={index} 
                        onClick={() => onBuddyClick && onBuddyClick(buddy)}
                        className={`flex items-center text-xs py-1 px-1.5 rounded transition-colors`}
                        >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-800 mr-1.5"></div>
                        <span className="truncate text-gray-800 font-semibold text-xs sm:text-sm transition-all duration-300">{buddy}</span>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
// -----------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------

interface CharacterCardProps {
    character?: CharacterData;
    className?: string;
    
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
    character, 
    className, 
}) => {
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
        <div className="w-full max-w-xl">
            <Card className="min-w-[265px] w-full p-2 bg-white overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 -gap-4">
                <CardContent className="-px-6 pt-6 bg-white">
                    {/* Card Header with Status, Level, and Avatar */}
                    {/* Banner */}
                    <Header 
                        level={level} 
                        status={status} 
                        containerClassName="mb-2 sm:mb-4" />
                    {/* Avatar */}
                    <AvatarBadge 
                        id={id}
                        avatar_url={avatar_url}
                        containerClassName="mb-1 sm:mb-2 -mt-10 sm:-mt-16" />
                    {/* Name & Race */}
                    <NameRaceBadge 
                        name={name} 
                        race={race} 
                        containerClassName="mb-1 sm:mb-2" />
                    {/* Class Badge */}
                    <ClassBadge 
                        class={Class} 
                        subclass={subclass} 
                        secondary_class={secondary_class} 
                        secondary_subclass={secondary_subclass} 
                        containerClassName="mb-1 sm:mb-2" />
                    {/* Stats Badge */}
                    <StatsBadge 
                        games={games} 
                        exp={exp} 
                        gold={gold} 
                        containerClassName="-mb-0 sm:-mb-2" />
                    {/* Last Game & Buddies */}
                    <BuddiesSection 
                        lastGame={last_game} 
                        buddies={buddies} 
                        onBuddyClick={() => {}} 
                        containerClassName="mt-1 sm:mt-2 -mb-1 sm:-mb-2" />
                </CardContent>
                <CardFooter className="flex items-center justify-center border-t border-gray-200 mt-2 mb-1">
                    {/* Player Name */}
                    <div className="flex items-center justify-center w-full">
                        <span className="text-xs sm:text-sm font-medium text-gray-800 transition-all duration-300">Gespielt von: <span className="text-xs sm:text-sm font-bold text-purple-800 transition-all duration-300">{player}</span></span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}