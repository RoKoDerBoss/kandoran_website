"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { NavBar } from "@/components/NavBar";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import GuildControls from "@/components/GuildControls";
import CharacterGroup from "@/components/CharacterGroup";
import VirtualizedCharacterList from "@/components/VirtualizedCharacterList";

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

// Type for player data
type PlayerData = {
  name: string;
  characterCount: number;
};

type GroupBy = 'name' | 'class' | 'level' | 'status';
type SortBy = 'alphabet' | 'level' | 'exp' | 'status';


// Helper functions - memoizing expensive operations
const groupCharacters = (characters: CharacterData[], groupBy: GroupBy) => {
  if (groupBy === 'name') return { 'All Characters': characters };

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

const sortCharacters = (characters: CharacterData[], sortBy: SortBy, isAscending: boolean) => {
  return [...characters].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'alphabet':
        comparison = (a.name || '').localeCompare(b.name || '');
        break;
      case 'level':
        comparison = (a.exp || 0) - (b.exp || 0);
        break;
      case 'exp':
        comparison = (a.exp || 0) - (b.exp || 0);
        break;
      case 'status':
        // Order: Active, Inactive, Dead
        const statusOrder = { 'Active': 0, 'Inactive': 1, 'Dead': 2 };
        comparison = (statusOrder[a.status as keyof typeof statusOrder] || 3) - 
                   (statusOrder[b.status as keyof typeof statusOrder] || 3);
        break;
      default:
        return 0;
    }
    
    // For numerical values (level, exp), we default to descending order,
    // but for string values (alphabet, status), we default to ascending
    const isNumericSort = sortBy === 'level' || sortBy === 'exp';
    
    // Apply the default direction first (descending for numbers)
    if (isNumericSort) {
      comparison = -comparison;
    }
    
    // Then apply the user-selected direction
    return isAscending ? -comparison : comparison;
  });
};

export default function Guild({}) {
  // State management with explicit types
  const [groupBy, setGroupBy] = useState<GroupBy>('level');
  const [sortBy, setSortBy] = useState<SortBy>('exp');
  const [isAscending, setIsAscending] = useState<boolean>(false); // Default to false (natural order)
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterData[]>([]); // For character search
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerData[]>([]); // For player search
  const [showInactive, setShowInactive] = useState<boolean>(true);
  const [searchResetKey, setSearchResetKey] = useState<number>(0); // Add reset key for search
  
  // Get characters data - using optimized hook with local storage caching
  const { characters, isLoading, error, refetch } = useCharacters();
  
  // Determine default sort direction
  const getDefaultSortDirection = useCallback((): boolean => {
    // We always return false to maintain natural order
    return false;
  }, []);
  
  // Memoized event handlers to prevent unnecessary recreations
  // Keep single-select for backwards compatibility
  const handleCharacterSelect = useCallback((character: CharacterData) => {
    setSelectedCharacters(prev => {
      // If already selected, don't add it again
      if (prev.some(c => c.id === character.id)) return prev;
      return [...prev, character];
    });
    
    // Clear any player selections
    setSelectedPlayers([]);
    
    // Automatically set groupBy to 'name' when searching
    if (groupBy !== 'name') {
      setGroupBy('name');
    }
  }, [groupBy]);

  // New handler for multi-select
  const handleMultiCharacterSelect = useCallback((characters: CharacterData[]) => {
    setSelectedCharacters(characters);
    
    // Clear any player selections
    setSelectedPlayers([]);
    
    // Only set groupBy to 'name' if characters are selected and not already grouped by name
    if (characters.length > 0 && groupBy !== 'name') {
      setGroupBy('name');
    }
  }, [groupBy]);

  // Player selection handlers
  const handlePlayerSelect = useCallback((player: PlayerData) => {
    setSelectedPlayers(prev => {
      // If already selected, don't add it again
      if (prev.some(p => p.name === player.name)) return prev;
      return [...prev, player];
    });
    
    // Clear any character selections
    setSelectedCharacters([]);
    
    // Set groupBy to 'name' when selecting players
    if (groupBy !== 'name') {
      setGroupBy('name');
    }
  }, [groupBy]);

  // Multiple player selection
  const handleMultiPlayerSelect = useCallback((players: PlayerData[]) => {
    setSelectedPlayers(players);
    
    // Clear any character selections
    setSelectedCharacters([]);
    
    // Set groupBy to 'name' when selecting players (if players are selected)
    if (players.length > 0 && groupBy !== 'name') {
      setGroupBy('name');
    }
  }, [groupBy]);

  // Clear player selection
  const handlePlayerClear = useCallback(() => {
    setSelectedPlayers([]);
    
    // Also reset grouping to level
    setGroupBy('level');
  }, []);

  const handleClearSearch = useCallback(() => {
    setSelectedCharacters([]);
    
    // When clearing the selection, reset grouping to level
    setGroupBy('level');
  }, []);
  
  // Memoize filter by search function - now handles player selections too
  const filterBySearch = useCallback((chars: CharacterData[]) => {
    // Handle character selection
    if (selectedCharacters.length > 0) {
      const selectedIds = new Set(selectedCharacters.map(c => c.id));
      return chars.filter(char => selectedIds.has(char.id));
    }
    
    // Handle player selection
    if (selectedPlayers.length > 0) {
      const selectedPlayerNames = new Set(selectedPlayers.map(p => p.name));
      return chars.filter(char => char.player && selectedPlayerNames.has(char.player));
    }
    
    return chars;
  }, [selectedCharacters, selectedPlayers]);

  // Memoize expensive computations to avoid recalculation on every render
  const activeInactiveChars = useMemo(() => {
    // If no search selections, apply normal filtering
    if (selectedCharacters.length === 0 && selectedPlayers.length === 0) {
      return (characters || []).filter((c: CharacterData) => {
        if (c.status === 'Active') return true;
        if (c.status === 'Inactive') return showInactive;
        return false;
      });
    } 
    
    // With search selections, only filter by search and apply the status filter
    return filterBySearch(
      (characters || []).filter((c: CharacterData) => {
        // Always include selected characters regardless of status (for search flexibility)
        const isSelectedChar = selectedCharacters.some(sc => sc.id === c.id);
        const isSelectedPlayer = c.player && selectedPlayers.some(sp => sp.name === c.player);
        if (isSelectedChar || isSelectedPlayer) return true;
        
        // Otherwise apply normal filters
        if (c.status === 'Active') return true;
        if (c.status === 'Inactive') return showInactive;
        return false;
      })
    );
  }, [characters, showInactive, filterBySearch, selectedCharacters, selectedPlayers]);

  const sortedActiveInactive = useMemo(() => 
    sortCharacters(activeInactiveChars, sortBy, isAscending),
    [activeInactiveChars, sortBy, isAscending]
  );
  
  const groupedActiveInactive = useMemo(() => 
    groupCharacters(sortedActiveInactive, groupBy),
    [sortedActiveInactive, groupBy]
  );
  
  const deadChars = useMemo(() => {
    // Check if any selected characters are dead
    const selectedDeadCharIds = selectedCharacters
      .filter(c => c.status === 'Dead')
      .map(c => c.id);
    
    // Check if any selected players have dead characters
    const selectedPlayerNames = selectedPlayers.map(p => p.name);
    
    // If search is active and there are dead characters selected, show only those
    if ((selectedCharacters.length > 0 && selectedDeadCharIds.length > 0) ||
        selectedPlayers.length > 0) {
      
      return (characters || [])
        .filter((c: CharacterData) => {
          if (c.status !== 'Dead') return false;
          
          // Include if character is selected
          if (selectedDeadCharIds.includes(c.id)) return true;
          
          // Include if character's player is selected
          if (c.player && selectedPlayerNames.includes(c.player)) return true;
          
          // Otherwise don't include
          return selectedCharacters.length === 0 && selectedPlayers.length === 0;
        });
    }
    
    // Otherwise show all dead characters
    return (characters || []).filter((c: CharacterData) => c.status === 'Dead');
  }, [characters, selectedCharacters, selectedPlayers]);
  
  // More optimized event handlers
  const handleGroupChange = useCallback((value: GroupBy) => {
    setGroupBy(value);
    
    // Set default sort based on the selected group
    let newSortBy: SortBy;
    switch (value) {
      case 'name':
        newSortBy = 'alphabet';
        break;
      case 'level':
        newSortBy = 'exp';
        break;
      case 'class':
        newSortBy = 'level';
        break;
      case 'status':
        newSortBy = 'alphabet';
        break;
      default:
        newSortBy = 'level';
    }
    
    setSortBy(newSortBy);
    // Reset sort direction to default for this sort type
    setIsAscending(getDefaultSortDirection());
  }, [getDefaultSortDirection]);
  
  const handleInactiveChange = useCallback((checked: boolean) => {
    setShowInactive(checked);
  }, []);
  
  const resetFilters = useCallback(() => {
    setGroupBy('level');
    setSortBy('exp');
    setIsAscending(getDefaultSortDirection());
    setShowInactive(true);
    setSelectedCharacters([]);
    setSelectedPlayers([]);
    setSearchResetKey(prev => prev + 1); // Increment the reset key to trigger search reset
  }, [getDefaultSortDirection]);
  

  // New handler to toggle sort direction
  const toggleSortDirection = useCallback(() => {
    setIsAscending(prev => !prev);
  }, []);

  // Animation classes
  const fadeInClass = "animate-in fade-in slide-in-from-bottom-4 duration-500";

  // Calculate total number of selected characters from players
  const selectedPlayersCharCount = useMemo(() => {
    return selectedPlayers.reduce((total, player) => total + player.characterCount, 0);
  }, [selectedPlayers]);

  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-[1650px] mx-auto">
        {/* Header section with responsive layout */}
        <div className="w-full mb-10 md:mb-14">
          {/* Mobile layout: stacked */}
          <div className="flex flex-col items-center md:hidden">
            <h1 className="text-3xl font-bold text-purple-900 text-center">Die Loge zur Grauen Hand</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2 mb-4">Mitglieder</h2>
          </div>
          
          {/* Desktop layout: centered header */}
          <div className="hidden md:block">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold mb-6 text-purple-900">Die Loge zur Grauen Hand</h1>
              <h2 className="text-2xl font-semibold mb-0 text-gray-700">Mitglieder</h2>
            </div>
          </div>
        </div>
        
        {/* Controls section with memorial link */}
        <div className="w-full flex flex-col mb-4">
          {/* Guild Controls */}
          <GuildControls 
            groupBy={groupBy}
            isAscending={isAscending}
            showInactive={showInactive}
            onGroupChange={handleGroupChange}
            onToggleSortDirection={toggleSortDirection}
            onInactiveChange={handleInactiveChange}
            onReset={resetFilters}
            characters={characters || []}
            onSelect={handleCharacterSelect}
            onClear={handleClearSearch}
            searchResetKey={searchResetKey}
            selectedCharacters={selectedCharacters}
            onMultiSelect={handleMultiCharacterSelect}
            selectedPlayers={selectedPlayers}
            onPlayerSelect={handlePlayerSelect}
            onPlayerClear={handlePlayerClear}
            onPlayerMultiSelect={handleMultiPlayerSelect}
          />
        </div>
        
        {/* Main Content - Guild Members */}
        <div className="w-full mb-12">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <LoadingSpinner size={40} className="mb-4" />
              <p className="text-gray-500">Lade Charakterdaten...</p>
            </div>
          )}
          
          {/* Error State with retry button */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-2">Fehler beim Laden der Charakterdaten</p>
              <p className="text-red-500 text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
              <button 
                onClick={() => refetch()} 
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Erneut versuchen
              </button>
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && (!characters || characters.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-gray-600 mb-4">Keine Charakterdaten verfügbar.</p>
            </div>
          )}
          
          {/* Selected Characters Count - for character search */}
          {selectedCharacters.length > 0 && (
            <div className="w-full px-4 py-2 rounded-lg mb-4 flex justify-between items-center bg-purple-50 border border-purple-100">
              <span className="text-purple-800 font-medium">
                {selectedCharacters.length} {selectedCharacters.length === 1 ? 'Charakter' : 'Charaktere'} ausgewählt
              </span>
              <button 
                onClick={handleClearSearch}
                className="text-purple-600 hover:text-purple-800 text-sm cursor-pointer"
              >
                Auswahl zurücksetzen
              </button>
            </div>
          )}
          
          {/* Selected Players Count - for player search */}
          {selectedPlayers.length > 0 && (
            <div className="w-full px-4 py-2 rounded-lg mb-4 flex justify-between items-center bg-purple-50 border border-purple-100">
              <span className="text-purple-800 font-medium">
                {selectedPlayers.length} {selectedPlayers.length === 1 ? 'Spieler' : 'Spieler'} mit {selectedPlayersCharCount} {selectedPlayersCharCount === 1 ? 'Charakter' : 'Charakteren'} ausgewählt
              </span>
              <button 
                onClick={handlePlayerClear}
                className="text-purple-600 hover:text-purple-800 text-sm cursor-pointer"
              >
                Auswahl zurücksetzen
              </button>
            </div>
          )}
          
          {/* Characters Display - Using CharacterGroup component for better performance */}
          {!isLoading && characters && characters.length > 0 && (
            <div className="space-y-8">
              {Object.entries(groupedActiveInactive).map(([group, chars], groupIndex) => (
                <CharacterGroup 
                  key={group}
                  groupName={group}
                  characters={chars}
                  showGroupName={groupBy !== 'name'}
                  index={groupIndex}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Memorial Section - Dead Characters */}
        <section id="memorials" className="w-full">
          {!isLoading && characters && deadChars.length > 0 && (
            <div className="w-full">
              <div className="border-t border-gray-300 w-full my-8"></div>
              
              <div className="flex items-center justify-left mb-6">
                <h2 className="text-2xl font-semibold text-gray-600">Esche der Erinnerungen</h2>
              </div>
              
              <div className="w-full bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200 space-y-8">
                <div className={`${fadeInClass} space-y-4`}>
                  {/* Using the VirtualizedList for better performance with larger lists */}
                  {deadChars.length > 20 ? (
                    <VirtualizedCharacterList 
                      characters={deadChars} 
                      columnCount={5}
                    />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                      {deadChars.map((character: CharacterData, index: number) => (
                        <div 
                          key={character.id || index} 
                          className="p-2 transition-all duration-500 opacity-90 saturate-[60%] hover:saturate-100 hover:opacity-100"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CharacterCard 
                            character={character} 
                            className="h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
} 