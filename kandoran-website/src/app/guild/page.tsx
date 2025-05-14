"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { NavBar } from "@/components/NavBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import GuildControls from "@/components/GuildControls";
import CharacterGroup from "@/components/CharacterGroup";
import Link from "next/link";
import { ArrowUpRight, Trees } from 'lucide-react';

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
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold mb-6 text-purple-900">Die Loge zur Grauen Hand</h1>
              <div className="flex flex-col items-center">
                <Link 
                  href="/guild/memorial" 
                  className="ml-6 flex items-center text-sm md:text-base text-purple-800"
                >
                  <Trees className="h-5 w-5 mr-1" />
                  <span>Esche der Erinnerungen</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
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
        
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-700">Mitglieder</h2>

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
      </div>
    </>
  );
} 