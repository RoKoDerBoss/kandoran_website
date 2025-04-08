"use client";

import React, { useState } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { NavBar } from "@/components/ui/NavBar";
import { CharacterCard } from "@/components/ui/CharacterCard";
import CharacterCardSkeleton from "@/components/ui/CharacterCardSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  SortAsc,
  SortDesc,
  RefreshCw,
  Layers3,
  Filter,
  User2,
  BookText,
  PieChart,
  SquareUserRound
} from 'lucide-react';
import { SearchCharacter } from "@/components/SearchCharacter";

// Types
type CharacterData = {
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
};

type GroupBy = 'none' | 'class' | 'level' | 'status';
type SortBy = 'alphabet' | 'level' | 'exp' | 'status';
type CardSize = 'sm' | 'md' | 'lg';

// Interface for props
interface GuildProps {
  size?: CardSize;
}

// Helper functions
const groupCharacters = (characters: CharacterData[], groupBy: GroupBy) => {
  if (groupBy === 'none') return { 'All Characters': characters };

  return characters.reduce((groups: Record<string, CharacterData[]>, character) => {
    const key = (() => {
      switch (groupBy) {
        case 'class':
          return character.class || 'Unknown';
        case 'level':
          return `Level ${character.level}` || 'Unknown';
        case 'status':
          return character.status || 'Unknown';
        default:
          return 'All Characters';
      }
    })();

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(character);
    return groups;
  }, {});
};

const sortCharacters = (characters: CharacterData[], sortBy: SortBy) => {
  return [...characters].sort((a, b) => {
    switch (sortBy) {
      case 'alphabet':
        return (a.name || '').localeCompare(b.name || '');
      case 'level':
        return (b.level || 0) - (a.level || 0);
      case 'exp':
        return (b.exp || 0) - (a.exp || 0);
      case 'status':
        // Order: Active, Inactive, Dead
        const statusOrder = { 'Active': 0, 'Inactive': 1, 'Dead': 2 };
        return (statusOrder[a.status as keyof typeof statusOrder] || 3) - 
               (statusOrder[b.status as keyof typeof statusOrder] || 3);
      default:
        return 0;
    }
  });
};

// Grid layout for different card sizes
const gridConfig = {
  sm: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  md: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  lg: 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
};

// Icons for controls
const controlIcons = {
  groupBy: {
    none: Filter,
    class: BookText,
    level: Layers3,
    status: PieChart,
  },
  sortBy: {
    alphabet: SortAsc,
    level: Layers3,
    exp: SortDesc,
    status: User2,
  },
  cardSize: {
    sm: SquareUserRound,
    md: SquareUserRound,
    lg: SquareUserRound
  }
};

export default function Guild({ size = "md" }: GuildProps) {
  // State
  const [groupBy, setGroupBy] = useState<GroupBy>('level');
  const [sortBy, setSortBy] = useState<SortBy>('level');
  const [cardSize, setCardSize] = useState<CardSize>(size as CardSize);
  const [activeMemorials, setActiveMemorials] = useState<boolean>(true);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  
  // Get characters data
  const { characters: fetchedCharacters, isLoading, error } = useCharacters();
  
  // Validate characters - ensure they have required fields
  const validateCharacter = (char: CharacterData): boolean => {
    return Boolean(
      char && 
      char.name && 
      char.level && 
      char.class && 
      char.status && 
      typeof char.level === 'number'
    );
  };

  // Filter out invalid characters
  const characters = fetchedCharacters?.filter(validateCharacter) || [];
  
  // Handle character selection
  const handleCharacterSelect = (character: CharacterData) => {
    setSelectedCharacter(character);
  };

  // Handle clearing the search
  const handleClearSearch = () => {
    setSelectedCharacter(null);
  };

  // Filter characters if search is active
  const filterBySearch = (chars: CharacterData[]) => {
    if (!selectedCharacter) return chars;
    return chars.filter(char => char.id === selectedCharacter.id);
  };

  // Apply the search filter in addition to status filters
  const activeInactiveChars = filterBySearch(
    characters.filter((c: CharacterData) => c.status === 'Active' || c.status === 'Inactive') || []
  );
  const deadChars = filterBySearch(
    characters.filter((c: CharacterData) => c.status === 'Dead') || []
  );
  
  // Sort characters first
  const sortedActiveInactive = sortCharacters(activeInactiveChars, sortBy);
  const sortedDead = sortCharacters(deadChars, sortBy);
  
  // Then group them
  const groupedActiveInactive = groupCharacters(sortedActiveInactive, groupBy);
  const groupedDead = groupCharacters(sortedDead, groupBy);
  
  // Set default sort based on group
  const handleGroupChange = (value: GroupBy) => {
    setGroupBy(value);
    
    // Set default sort based on the selected group
    switch (value) {
      case 'none':
        setSortBy('alphabet');
        break;
      case 'level':
        setSortBy('level');
        break;
      case 'class':
        setSortBy('level');
        break;
      case 'status':
        setSortBy('alphabet');
        break;
      default:
        setSortBy('alphabet');
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setGroupBy('level');
    setSortBy('level');
    setCardSize('md');
  };
  
  // Handle buddy click
  const handleBuddyClick = (buddy: string) => {
    console.log(`Clicked on buddy: ${buddy}`);
    // Here you could add functionality to highlight all cards with that buddy
  };

  // Animation classes
  const fadeInClass = "animate-in fade-in slide-in-from-bottom-4 duration-500";
  
  // Get the current group by icon
  const GroupByIcon = controlIcons.groupBy[groupBy];
  const SortByIcon = controlIcons.sortBy[sortBy];
  const CardSizeIcon = controlIcons.cardSize[cardSize];

  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-[1650px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-900">Die Loge zur Grauen Hand</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">Mitglieder</h2>
        
        {/* Controls */}
        <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
            {/* Group By */}
            <div className="flex items-center">
              <GroupByIcon className="mr-2 h-4 w-4 text-purple-800" aria-hidden="true" />
              <Select value={groupBy} onValueChange={(value) => handleGroupChange(value as GroupBy)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Gruppieren nach..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gruppieren nach</SelectLabel>
                    <SelectItem value="none">Keine Gruppierung</SelectItem>
                    <SelectItem value="class">Klasse</SelectItem>
                    <SelectItem value="level">Level</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort By */}
            <div className="flex items-center">
              <SortByIcon className="mr-2 h-4 w-4 text-purple-800" aria-hidden="true" />
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sortieren nach..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sortieren nach</SelectLabel>
                    <SelectItem value="alphabet">Alphabetisch</SelectItem>
                    <SelectItem value="level">Level</SelectItem>
                    <SelectItem value="exp">Erfahrung</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Card Size */}
            <div className="flex items-center">
              <CardSizeIcon className="mr-2 h-4 w-4 text-purple-800" aria-hidden="true" />
              <Select value={cardSize} onValueChange={(value) => setCardSize(value as CardSize)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Kartengröße..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kartengröße</SelectLabel>
                    <SelectItem value="sm">Klein (6 pro Reihe)</SelectItem>
                    <SelectItem value="md">Mittel (5 pro Reihe)</SelectItem>
                    <SelectItem value="lg">Groß (4 pro Reihe)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search - takes remaining space */}
            <div className="flex-grow">
              <SearchCharacter 
                characters={characters || []}
                onSelect={handleCharacterSelect}
                onClear={handleClearSearch}
                placeholder="Nach Charakter suchen..."
              />
            </div>
            
            {/* Reset Button - Icon only */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={resetFilters}
              className="h-10 w-10 rounded-full border-purple-200 text-purple-900 hover:bg-purple-50"
              title="Zurücksetzen"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Main Content - Guild Members */}
        <div className="w-full mb-12">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <LoadingSpinner size={40} className="mb-4" />
              <p className="text-gray-500">Lade Charakterdaten...</p>
              
              {/* Skeleton Cards */}
              <div className={`grid ${gridConfig[cardSize]} gap-6 mt-8`}>
                {[...Array(10)].map((_, i) => (
                  <CharacterCardSkeleton key={i} size={cardSize} />
                ))}
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-2">Fehler beim Laden der Charakterdaten</p>
              <p className="text-red-500 text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && (!characters || characters.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-gray-600 mb-4">Keine Charakterdaten verfügbar.</p>
            </div>
          )}
          
          {/* Characters Display - Grouped */}
          {!isLoading && characters && characters.length > 0 && (
            <div className="space-y-8">
              {Object.entries(groupedActiveInactive).map(([group, chars], groupIndex) => (
                <div key={group} className={`${fadeInClass} space-y-4`} style={{ animationDelay: `${groupIndex * 100}ms` }}>
                  {/* Group Title (only if grouped) */}
                  {groupBy !== 'none' && (
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">{group}</h3>
                  )}
                  
                  {/* Characters Grid */}
                  <div className={`grid ${gridConfig[cardSize]} gap-3`}>
                    {chars.map((character, charIndex) => (
                      <div 
                        key={character.id || charIndex} 
                        className="transition-all duration-500 ease-in-out transform opacity-100 hover:z-10"
                        style={{ animationDelay: `${(groupIndex * 5 + charIndex) * 50}ms` }}
                      >
                        <CharacterCard 
                          character={character} 
                          size={cardSize}
                          onBuddyClick={handleBuddyClick}
                          className="h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Memorial Section - Dead Characters */}
        {!isLoading && characters && deadChars.length > 0 && (
          <div className="w-full">
            <div className="border-t border-gray-300 w-full my-8"></div>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-600">Esche der Erinnerungen</h2>
              <Button
                variant="ghost"
                onClick={() => setActiveMemorials(!activeMemorials)}
                className="text-gray-500"
              >
                {activeMemorials ? 'Ausblenden' : 'Einblenden'}
              </Button>
            </div>
            
            {activeMemorials && (
              <div className="w-full bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200 space-y-8">
                {Object.entries(groupedDead).map(([group, chars], groupIndex) => (
                  <div key={group} className={`${fadeInClass} space-y-4`} style={{ animationDelay: `${groupIndex * 100}ms` }}>
                    {/* Group Title (only if grouped) */}
                    {groupBy !== 'none' && (
                      <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">{group}</h3>
                    )}
                    
                    {/* Dead Characters Grid */}
                    <div className={`grid ${gridConfig[cardSize]} gap-3`}>
                      {chars.map((character, charIndex) => (
                        <div 
                          key={character.id || charIndex} 
                          className="transition-all duration-500 ease-in-out transform opacity-90 saturate-[60%] hover:saturate-100 hover:opacity-100"
                          style={{ animationDelay: `${(groupIndex * 5 + charIndex) * 50}ms` }}
                        >
                          <CharacterCard 
                            character={character} 
                            size={cardSize}
                            onBuddyClick={handleBuddyClick}
                            className="h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
} 