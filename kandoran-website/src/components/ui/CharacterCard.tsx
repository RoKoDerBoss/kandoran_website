"use client";

// -----------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------
import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { 
  Crown,
  Sparkles,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  Coins,
} from 'lucide-react';

// Import class icons
import { getClassIcon } from '@/lib/utils/classIcons';

// Import shadcn components
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// -----------------------------------------------------------
// COLOR VARIABLES
// -----------------------------------------------------------
const colors = {
  // Background colors
  background: {
    card: "bg-white",
    darker: "bg-gray-900",
    dark: "bg-gray-700",
    header: "bg-gray-900",
    gradient: {
      from: "from-purple-900",
      to: "to-purple-800"
    }
  },
  // Text colors
  text: {
    primary: "text-purple-900",
    primaryDark: "text-purple-800",
    primaryGlow: "text-purple-600",
    foreground: "text-gray-800",
    muted: "text-gray-500",
    accent: "text-[#FFD54C]"
  },
  // Border colors
  border: {
    default: "border-gray-200",
    accent: "border-[#FFD54C]",
    primary: "border-purple-100"
  },
  // Status colors
  status: {
    active: "bg-emerald-500",
    activeLight: "bg-emerald-300",
    inactive: "bg-amber-500",
    inactiveLight: "bg-amber-300",
    dead: "bg-gray-500",
    deadLight: "bg-gray-400"
  },
  // Icon colors
  icon: {
    games: "text-emerald-500",
    exp: "text-blue-500",
    gold: "text-amber-500",
    buddies: "text-purple-600",
    lastGame: "text-gray-500"
  },
  // Highlight & accent colors
  highlight: {
    primary: "bg-purple-50",
    hover: "hover:bg-purple-100"
  }
};

// -----------------------------------------------------------
// VARIANTS AND SETTINGS
// -----------------------------------------------------------

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

// Card variants
const cardVariants = cva(
  `overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 ${colors.background.card}`,
  {
    variants: {
      size: {
        sm: "w-[265px]",
        md: "w-[320px]",
        lg: "w-[384px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Extract variant props type
type CardVariantProps = VariantProps<typeof cardVariants>;

// Size specific configurations
const sizeConfig = {
  sm: {
    levelBadge: "w-10 h-10", 
    levelText: "text-lg",
    statusBadge: "px-2 py-0.5 text-[10px]",
    statusDot: "w-0.5 h-0.5",
    minStatusWidth: "w-14",
    avatarContainerPadding: "pt-3 pb-10",
    avatarSize: "h-24 w-24",
    nameText: "text-base",
    raceText: "text-xs",
    badgeIconSize: "h-5 w-5",
    badgePadding: "p-1.5",
    badgeClassText: "text-[10px]",
    badgeSubclassText: "text-[9px]",
    statsText: "text-[10px]",
    statsValueText: "text-xs",
    statsIconSize: "h-2.5 w-2.5",
    buddiesToggleText: "text-[11px]",
    buddiesIconSize: "h-2.5 w-2.5",
    calendarIconSize: "h-2.5 w-2.5",
    lastGameText: "text-[11px]",
    cardContentPadding: "pt-10 px-3 pb-0",
    footerText: "text-[12px]",
    bannerHeight: "h-12"
  },
  md: {
    levelBadge: "w-12 h-12",
    levelText: "text-xl",
    statusBadge: "px-3 py-1 text-[11px]",
    statusDot: "w-2 h-2",
    minStatusWidth: "w-19",
    avatarContainerPadding: "pt-4 pb-14",
    avatarSize: "h-28 w-28",
    nameText: "text-xl",
    raceText: "text-sm",
    badgeIconSize: "h-6 w-6",
    badgePadding: "p-2",
    badgeClassText: "text-sm",
    badgeSubclassText: "text-xs",
    statsText: "text-xs",
    statsValueText: "text-sm",
    statsIconSize: "h-3 w-3",
    buddiesToggleText: "text-xs",
    buddiesIconSize: "h-3 w-3",
    calendarIconSize: "h-3 w-3",
    lastGameText: "text-xs",
    cardContentPadding: "pt-14 px-4 pb-0",
    footerText: "text-[13px]",
    bannerHeight: "h-16"
  },
  lg: {
    levelBadge: "w-14 h-14",
    levelText: "text-2xl",
    statusBadge: "px-3 py-1 text-sm",
    statusDot: "w-2.5 h-2.5",
    minStatusWidth: "w-23",
    avatarContainerPadding: "pt-5 pb-16",
    avatarSize: "h-32 w-32",
    nameText: "text-2xl",
    raceText: "text-base",
    badgeIconSize: "h-7 w-7",
    badgePadding: "p-2.5",
    badgeClassText: "text-base",
    badgeSubclassText: "text-sm",
    statsText: "text-sm",
    statsValueText: "text-base",
    statsIconSize: "h-3.5 w-3.5",
    buddiesToggleText: "text-sm",
    buddiesIconSize: "h-3.5 w-3.5",
    calendarIconSize: "h-3.5 w-3.5",
    lastGameText: "text-sm",
    cardContentPadding: "pt-20 px-5 pb-0",
    footerText: "text-sm",
    bannerHeight: "h-20"
  }
};

// Default status colors
const defaultStatusColors = {
  Active: colors.status.active, 
  Inactive: colors.status.inactive, 
  Dead: colors.status.dead 
};

const defaultStatusDotColors = {
  Active: colors.status.activeLight,
  Inactive: colors.status.inactiveLight,
  Dead: colors.status.deadLight
};

// -----------------------------------------------------------
// CUSTOM COMPONENT INTERFACES
// -----------------------------------------------------------

interface CardHeaderProps {
  level: number;
  status: string;
  avatarUrl: string;
  statusColors?: Record<string, string>;
  statusDotColors?: Record<string, string>;
  size?: "sm" | "md" | "lg";
  dndbeyondUrl?: string | null;
  className?: string;
}

interface CardNameDisplayProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface ClassBadgeProps {
  className: string;
  subclassName?: string;
  size?: "sm" | "md" | "lg";
  customClassName?: string;
}

interface ClassInfoProps {
  className: string;
  subclassName?: string;
  secondaryClass?: string;
  secondarySubclass?: string;
  size?: "sm" | "md" | "lg";
  containerClassName?: string;
}

interface CharacterStatsProps {
  games: number;
  exp: number;
  gold: number;
  size?: "sm" | "md" | "lg";
  containerClassName?: string;
}

interface BuddiesSectionProps {
  buddies: string | string[];
  lastGame: string;
  buddiesLabelText?: string;
  onBuddyClick?: (buddy: string) => void;
  size?: "sm" | "md" | "lg";
  containerClassName?: string;
}

interface CharacterCardProps extends CardVariantProps {
  character: CharacterData;
  className?: string;
  customBadgeColors?: {
    status?: Record<string, string>;
    statusDot?: Record<string, string>;
  };
  onBuddyClick?: (buddy: string) => void;
  showExternalLink?: boolean;
}

// -----------------------------------------------------------
// CUSTOM EXPORTABLE COMPONENTS
// -----------------------------------------------------------

// Card Header Component
const CardHeader: React.FC<CardHeaderProps> = ({ 
  level, 
  status, 
  avatarUrl, 
  statusColors = defaultStatusColors,
  statusDotColors = defaultStatusDotColors,
  size = "md",
  dndbeyondUrl,
  className
}) => {
  const config = sizeConfig[size];
  const getStatusColor = (status: string): string => {
    return statusColors[status as keyof typeof statusColors] || `${colors.status.dead}`;
  };
  const getStatusDotColor = (status: string): string => {
    return statusDotColors[status as keyof typeof statusDotColors] || `${colors.status.deadLight}`;
  };
  
  return (
    <div className={className}>
      {/* Level Badge */}
      <div className={`absolute top-0 right-0 ${config.levelBadge} ${colors.background.dark} flex flex-col items-center justify-center shadow-md z-10 rounded-bl-lg`}>
        <div className="text-xs font-medium text-gray-300">LVL</div>
        <div className={`text-white font-bold -m-1 ${config.levelText}`}>{level}</div>
      </div>
      
      {/* Status Badge */}
      <div className="absolute top-0 left-0 m-1.5 z-10">
        <Badge className={`${getStatusColor(status)} ${config.minStatusWidth} text-white font-bold ${config.statusBadge} shadow-md flex items-center gap-1 border-none`}>
          {(size === "md" || size === "lg") && (
            <div className={`${config.statusDot} rounded-full ${getStatusDotColor(status)} animate-pulse`}></div>
          )}
          <span className="-mr-0.5">{status}</span>
        </Badge>
      </div>
      
      {/* Avatar Section */}
      <div className="relative">
        {/* Header banner (dark purple background) */}
        <div className={`${config.bannerHeight} ${colors.background.header} w-full absolute top-0 left-0`}></div>
        
        {/* Avatar container with adjusted positioning */}
        <div className={`${config.avatarContainerPadding} relative`}>

          {/* Avatar with adjusted position */}
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: `calc(${config.bannerHeight} / 2)` }}>
            {dndbeyondUrl ? (
              <a 
                href={dndbeyondUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block rounded-full overflow-hidden ${colors.border.accent} border-3 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer`}
                title="View on D&D Beyond"
              >
                <Avatar className={config.avatarSize}>
                  <AvatarImage src={avatarUrl} alt="Character Avatar" />
                  <AvatarFallback>
                    {level}
                  </AvatarFallback>
                </Avatar>
              </a>
            ) : (
              <div className={`rounded-full ${colors.border.accent} border-3 bg-white shadow-lg overflow-hidden ${config.avatarSize}`}>
                <Avatar className={config.avatarSize}>
                  <AvatarImage src={avatarUrl} alt="Character Avatar" />
                  <AvatarFallback>
                    {level}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Character Name Component
const CardNameDisplay: React.FC<CardNameDisplayProps> = ({ 
  name, 
  size = "md",
  className 
}) => {
  const config = sizeConfig[size];
  
  return (
    <div className={className}>
      <div className="inline-flex items-center">
        <h2 className={`font-bold ${colors.text.foreground} ${config.nameText}`}>{name}</h2>
      </div>
    </div>
  );
};

// Class Badge Component
const ClassBadge: React.FC<ClassBadgeProps> = ({ 
  className: charClassName, 
  subclassName, 
  size = "md",
  customClassName
}) => {
  const config = sizeConfig[size];
  const IconComponent = getClassIcon(charClassName);
  const iconVariant = size as 'sm' | 'md' | 'lg';
  
  return (
    <div className={customClassName}>
      <div className="flex w-full items-center">
        <div className="flex-shrink-0 mr-1 flex items-center justify-center">
          <IconComponent variant={iconVariant} />
        </div>
        <div className="min-w-0 flex flex-col">
          <span className={`font-semibold ${colors.text.primaryDark} block truncate ${config.badgeClassText}`}>{charClassName}</span>
          {subclassName && (
            <span className={`${colors.text.primaryGlow} block truncate ${config.badgeSubclassText}`}>{subclassName}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Class Information Component
const ClassInfo: React.FC<ClassInfoProps> = ({ 
  className: charClassName, 
  subclassName, 
  secondaryClass, 
  secondarySubclass,
  size = "md",
  containerClassName
}) => {
  return (
    <div className={containerClassName}>
      <div className={`grid ${secondaryClass ? 'grid-cols-2' : 'grid-cols-1'} ${size === "sm" ? 'gap-1' : 'gap-2'} ${secondaryClass ? 'w-full' : 'w-1/2'}`}>
        {/* Primary Class */}
        <ClassBadge 
          className={charClassName} 
          subclassName={subclassName} 
          size={size}
          customClassName={`${colors.highlight.primary} rounded-lg ${colors.border.primary} border flex items-center justify-center p-2`}
        />
        
        {/* Secondary Class (if exists) */}
        {secondaryClass && (
          <ClassBadge 
            className={secondaryClass} 
            subclassName={secondarySubclass || "-"}
            size={size}
            customClassName={`${colors.highlight.primary} rounded-lg ${colors.border.primary} border flex items-center justify-center p-2`}
          />
        )}
      </div>
    </div>
  );
};

// Stats Component
const CharacterStats: React.FC<CharacterStatsProps> = ({ 
  games, 
  exp, 
  gold, 
  size = "md",
  containerClassName
}) => {
  const config = sizeConfig[size];
  
  return (
    <div className={containerClassName}>
      <div className={`${colors.background.card} ${colors.border.default} border p-1.5 rounded-lg flex flex-col items-center`}>
        <div className="flex items-center mb-1">
          <Crown className={`${config.statsIconSize} mr-1 ${colors.icon.games}`} />
          <span className={`font-normal ${colors.text.foreground} ${config.statsText}`}>GAMES</span>
        </div>
        <span className={`font-bold ${colors.text.foreground} ${config.statsValueText}`}>{games}</span>
      </div>
      
      <div className={`${colors.background.card} ${colors.border.default} border p-1.5 rounded-lg flex flex-col items-center`}>
        <div className="flex items-center mb-1">
          <Sparkles className={`${config.statsIconSize} mr-1 ${colors.icon.exp}`} />
          <span className={`font-normal ${colors.text.foreground} ${config.statsText}`}>EXP</span>
        </div>
        <span className={`font-bold ${colors.text.foreground} ${config.statsValueText}`}>{exp}</span>
      </div>
      
      <div className={`${colors.background.card} ${colors.border.default} border p-1.5 rounded-lg flex flex-col items-center`}>
        <div className="flex items-center mb-1">
          <Coins className={`${config.statsIconSize} mr-1 ${colors.icon.gold}`} />
          <span className={`font-normal ${colors.text.foreground} ${config.statsText}`}>GOLD</span>
        </div>
        <span className={`font-bold ${colors.text.foreground} ${config.statsValueText}`}>{gold}</span>
      </div>
    </div>
  );
};

// Buddies Section Component
const BuddiesSection: React.FC<BuddiesSectionProps> = ({ 
  buddies, 
  lastGame,
  buddiesLabelText = "Buddies",
  onBuddyClick,
  size = "md",
  containerClassName
}) => {
  const [showBuddies, setShowBuddies] = useState<boolean>(false);
  const buddiesArray = typeof buddies === 'string' 
    ? buddies.split(', ').filter(buddy => buddy.trim() !== '') 
    : Array.isArray(buddies) ? buddies : [];
  
  const config = sizeConfig[size];
  
  return (
    <div className={containerClassName}>
      {/* Last Game & Buddies Toggle */}
      <div className="flex justify-between items-center">
        <div className={`flex items-center ${colors.text.muted}`}>
          <Calendar className={`${config.calendarIconSize} mr-1 ${colors.icon.lastGame}`} />
          <span className={config.lastGameText}>Last: {lastGame}</span>
        </div>
        
        {/* Show Buddies Toggle only if buddies exist */}
        {buddiesArray.length > 0 && (
          <button 
            onClick={() => setShowBuddies(!showBuddies)}
            className={`flex items-center font-medium ${colors.text.primary} hover:${colors.text.primaryDark.replace('text-', 'text-')} transition-colors duration-200 cursor-pointer`}
          >
            <Users className={`${config.buddiesIconSize} mr-1`} />
            <span className={config.buddiesToggleText}>{buddiesLabelText} ({buddiesArray.length})</span>
            <span className="transition-transform duration-300 ease-in-out ml-1">
              {showBuddies ? 
                <ChevronUp className={config.buddiesIconSize} /> : 
                <ChevronDown className={config.buddiesIconSize} />
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
          <div className={`p-2 ${colors.background.card} rounded-lg ${colors.border.default} border ${colors.text.foreground} transform transition-all mt-3`}>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 max-h-34 overflow-y-auto pr-1">
              {buddiesArray.map((buddy, index) => (
                <div 
                  key={index} 
                  onClick={() => onBuddyClick && onBuddyClick(buddy)}
                  className={`text-xs py-1 px-1.5 ${colors.highlight.hover} rounded cursor-pointer flex items-center transition-colors`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mr-1.5"></div>
                  <span className="truncate">{buddy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------
// MAIN CHARACTER CARD COMPONENT
// -----------------------------------------------------------

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character,
  className,
  size = "md",
  customBadgeColors,
  onBuddyClick,
  showExternalLink = true,
  ...props
}) => {
  // Ensure size is never null - use md as fallback
  const sizeValue = size ?? "md";
  
  // Ensure sizeValue is a valid key in sizeConfig, default to "md" if not
  const validSize = (sizeValue === "sm" || sizeValue === "md" || sizeValue === "lg") ? sizeValue : "md";
  const config = sizeConfig[validSize];
  
  // Extract character properties with defaults
  const {
    id,
    name = "Unknown",
    race = "",
    level = 1,
    class: charClass = "",
    subclass = "",
    secondary_class: secondaryClass = "",
    secondary_subclass: secondarySubclass = "",
    gold = 0,
    status = "Inactive",
    exp = 0,
    games = 0,
    last_game: lastGame = "-",
    buddies = "",
    player = "",
    avatar_url: avatarUrl = "https://www.dndbeyond.com/avatars/default/0.jpg"
  } = character || {};

  // Create D&D Beyond URL if ID exists and showExternalLink is true
  const dndbeyondUrl = showExternalLink && id ? `https://www.dndbeyond.com/characters/${id}` : null;

  return (
    <Card className={`${cardVariants({ size: validSize })} ${className} flex flex-col h-full`} {...props}>
      {/* Card Header with Avatar and Status */}
      <CardHeader 
        level={level} 
        status={status} 
        avatarUrl={avatarUrl}
        statusColors={customBadgeColors?.status}
        statusDotColors={customBadgeColors?.statusDot}
        size={validSize}
        dndbeyondUrl={dndbeyondUrl}
        className="relative"
      />
      
      {/* Card Content */}
      <CardContent className={`${config.cardContentPadding} flex-grow flex flex-col`}>
        {/* Character Name */}
        <CardNameDisplay 
          name={name}
          size={validSize}
          className={`flex justify-center items-center ${validSize === "sm" ? "-mb-1" : validSize === "md" ? "-mt-3" : "-mt-6"}`}
        />
        
        {/* Race */}
        <p className={`text-center ${colors.text.muted} mb-3`}>
          <span className={config.raceText}>{race}</span>
        </p>
        
        {/* Class Information */}
        <ClassInfo 
          className={charClass} 
          subclassName={subclass}
          secondaryClass={secondaryClass}
          secondarySubclass={secondarySubclass || "-"}
          size={validSize}
          containerClassName="flex justify-center mb-3"
        />
        
        {/* Stats Grid */}
        <CharacterStats 
          games={games} 
          exp={exp} 
          gold={gold} 
          size={validSize}
          containerClassName={`grid grid-cols-3 ${validSize === "sm" ? "gap-1" : "gap-2"} mb-3`}
        />
        
        {/* Last Game & Buddies Row */}
        <BuddiesSection 
          buddies={buddies} 
          lastGame={lastGame}
          onBuddyClick={onBuddyClick}
          size={validSize}
          containerClassName="mb-3"
        />
        
        {/* Add spacer to push footer to bottom */}
        <div className="flex-grow"></div>
      </CardContent>
      
      {/* Card Footer */}
      <CardFooter className={`flex justify-center p-1 border-t ${colors.border.default} -mt-6`}>
        <div className={`text-center ${colors.text.muted} ${config.footerText}`}>
          Played by <span className={`font-medium ${colors.text.foreground}`}>{player}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

// -----------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------

export { 
  CharacterCard, 
  CardHeader, 
  CardNameDisplay as CardName, 
  ClassInfo, 
  ClassBadge,
  CharacterStats,
  BuddiesSection
};

export default CharacterCard;