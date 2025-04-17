import React, { memo } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { SearchCharacter } from "@/components/SearchCharacter";
import { SearchPlayer } from "@/components/SearchPlayer";
import {
  SortDesc,
  SortAsc,
  RefreshCw,
  User,
} from 'lucide-react';

// Types
type GroupBy = 'name' | 'class' | 'level' | 'status';

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

interface GuildControlsProps {
  groupBy: GroupBy;
  isAscending: boolean;
  showInactive: boolean;
  onGroupChange: (value: GroupBy) => void;
  onToggleSortDirection: () => void;
  onInactiveChange: (checked: boolean) => void;
  onReset: () => void;
  characters: CharacterData[];
  onSelect: (character: CharacterData) => void;
  onClear: () => void;
  searchResetKey?: number;
  selectedCharacters?: CharacterData[];
  onMultiSelect?: (characters: CharacterData[]) => void;
  selectedPlayers?: PlayerData[];
  onPlayerSelect?: (player: PlayerData) => void;
  onPlayerClear?: () => void;
  onPlayerMultiSelect?: (players: PlayerData[]) => void;
}

// Use React.memo to prevent unnecessary re-renders
const GuildControls = memo(({
  groupBy,
  isAscending,
  showInactive,
  characters,
  onGroupChange,
  onToggleSortDirection,
  onInactiveChange,
  onReset,
  onSelect,
  onClear,
  searchResetKey = 0,
  selectedCharacters = [],
  onMultiSelect,
  selectedPlayers = [],
  onPlayerSelect = () => {},
  onPlayerClear = () => {},
  onPlayerMultiSelect
}: GuildControlsProps) => {
  // Toggle between character and player search
  const [searchMode, setSearchMode] = React.useState<'character' | 'player'>('character');

  const toggleSearchMode = () => {
    setSearchMode(prev => prev === 'character' ? 'player' : 'character');
  };

  return (
    <div className="w-full min-w-[265px] bg-white p-2 md:p-4 rounded-lg shadow-md mb-8">
  
      <div className="flex flex-wrap md:flex-nowrap items-center space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4 w-full md:max-w-1/3">
          <div className='flex w-1/2 md:w-auto'>
            {/* Group By */}
            <div className="flex flex-1 items-center space-x-3 h-8 sm:h-9">
                {/* <Layers3 className="h-5 w-5 text-purple-800" aria-hidden="true" /> */}
                <Select value={groupBy} onValueChange={(value) => onGroupChange(value as GroupBy)}>
                  <SelectTrigger className="w-full md:w-40 text-sm">
                    <SelectValue placeholder="Gruppieren nach..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gruppieren nach</SelectLabel>
                      <SelectItem value="level" className="text-xs sm:text-sm">Level</SelectItem>
                      <SelectItem value="class" className="text-xs sm:text-sm">Klasse</SelectItem>
                      <SelectItem value="name" className="text-xs sm:text-sm">Name</SelectItem>
                      <SelectItem value="status" className="text-xs sm:text-sm">Status</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <button onClick={onToggleSortDirection} className="cursor-pointer hover:scale-105 transition-transform duration-50 md:border-r md:h-10 md:pr-2 md:border-gray-200">
                  {isAscending ? (
                    <SortAsc className="h-4 w-4 text-purple-800" aria-hidden="true" />
                  ) : (
                    <SortDesc className="h-4 w-4 text-purple-800" aria-hidden="true" />
                  )}
                </button>
            </div>
          </div>
          
          <div className='flex flex-grow items-center justify-end md:justify-start w-full'>
            {/* Show/Hide Inactive Characters Checkbox */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-inactive"
                  checked={showInactive}
                  onCheckedChange={onInactiveChange}
                  className="cursor-pointer hover:border-purple-500 transition-colors duration-300"
                />
                <label 
                  htmlFor="show-inactive" 
                  className="text-sm text-gray-700 cursor-pointer select-none hover:text-purple-800 transition-colors duration-50">
                  Inaktive
                </label>
              </div>
            </div>
          </div>  
      </div>

          <div className="flex space-x-1 w-full items-center">
            <div className='flex flex-wrap space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 w-full items-center'>
              {/* Search - Player */}
            <SearchPlayer
                  characters={characters}
                  onSelect={onPlayerSelect}
                  onClear={onPlayerClear}
                  placeholder="Spieler suchen..."
                  resetKey={searchResetKey}
                  selectedPlayers={selectedPlayers}
                  onMultiSelect={onPlayerMultiSelect}
                  className=''
                />
              {/* Search - Character */}
              <SearchCharacter 
                    characters={characters}
                    onSelect={onSelect}
                    onClear={onClear}
                    placeholder="Charakter suchen..."
                    resetKey={searchResetKey}
                    selectedCharacters={selectedCharacters}
                    onMultiSelect={onMultiSelect}
                    className=''
                  />
            </div>
            
            {/* Reset Button - Icon only */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onReset}
              className="h-10 w-10 rounded-full shadow-xs text-purple-900 bg-white border-0 cursor-pointer"
              title="Zurücksetzen">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
    </div>
  );
});

// Add displayName for debugging
GuildControls.displayName = 'GuildControls';

export default GuildControls;