"use client"

import * as React from "react"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Check, ChevronsUpDown, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Type for character data
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

interface PlayerSearchProps {
  characters: CharacterData[]; // We need the full character data to extract players
  onSelect: (player: PlayerData) => void;
  onClear: () => void;
  onMultiSelect?: (players: PlayerData[]) => void;
  selectedPlayers?: PlayerData[];
  placeholder?: string;
  className?: string;
  resetKey?: number;
}

export function SearchPlayer({
  characters,
  onSelect,
  onClear,
  onMultiSelect,
  selectedPlayers = [],
  placeholder = "Suche nach Spielern...",
  className,
  resetKey = 0,
}: PlayerSearchProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [internalSelectedPlayers, setInternalSelectedPlayers] = 
    useState<PlayerData[]>(selectedPlayers)

  // Use external or internal selected players based on which is provided
  const effectiveSelectedPlayers = selectedPlayers.length > 0 
    ? selectedPlayers 
    : internalSelectedPlayers

  // Reset search when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      setSearchQuery("");
      setInternalSelectedPlayers([]);
    }
  }, [resetKey]);

  // Extract unique players from character data
  const playerOptions = useMemo(() => {
    // Create a map to count characters per player
    const playerMap = new Map<string, number>();
    
    // Count characters per player
    characters.forEach(char => {
      if (char.player) {
        const count = playerMap.get(char.player) || 0;
        playerMap.set(char.player, count + 1);
      }
    });
    
    // Convert to array of player options
    return Array.from(playerMap.entries())
      .map(([name, characterCount]) => ({
        label: name,
        value: name,
        player: { name, characterCount }
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [characters])

  // Filter player options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return playerOptions;
    
    return playerOptions.filter(option => 
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playerOptions, searchQuery]);

  const handleSelect = useCallback((currentValue: string) => {
    // Log for debugging
    console.log('Player selected:', currentValue);
    
    const selected = playerOptions.find(option => option.value === currentValue);
    
    if (selected) {
      // Check if already selected
      const isAlreadySelected = effectiveSelectedPlayers.some(
        p => p.name === selected.player.name
      );

      if (isAlreadySelected) {
        // Remove from selection
        const newSelected = effectiveSelectedPlayers.filter(
          p => p.name !== selected.player.name
        );
        
        if (onMultiSelect) {
          onMultiSelect(newSelected);
        } else {
          setInternalSelectedPlayers(newSelected);
        }

        // If we just removed the last item, also call onClear
        if (newSelected.length === 0) {
          onClear();
        }
      } else {
        // Add to selection
        const newSelected = [...effectiveSelectedPlayers, selected.player];
        
        // Log for debugging
        console.log('New selection:', newSelected);
        
        if (onMultiSelect) {
          onMultiSelect(newSelected);
        } else {
          setInternalSelectedPlayers(newSelected);
        }
        
        // Also call onSelect for backward compatibility
        onSelect(selected.player);
      }
    } else {
      handleClear();
    }
  }, [playerOptions, effectiveSelectedPlayers, onSelect, onMultiSelect, onClear]);
  
  const handleClear = useCallback(() => {
    setSearchQuery("");
    
    if (onMultiSelect) {
      onMultiSelect([]);
    } else {
      setInternalSelectedPlayers([]);
    }
    
    onClear();
  }, [onClear, onMultiSelect]);

  // Get display text for selected players
  const selectedDisplayText = useMemo(() => {
    if (effectiveSelectedPlayers.length === 0) return "";
    if (effectiveSelectedPlayers.length === 1) return effectiveSelectedPlayers[0].name;
    if (effectiveSelectedPlayers.length === 2) return `${effectiveSelectedPlayers[0].name} & ${effectiveSelectedPlayers[1].name}`;
    return `${effectiveSelectedPlayers[0].name}, ${effectiveSelectedPlayers[1].name} & ${effectiveSelectedPlayers.length - 2} weitere ausgewählt`;
  }, [effectiveSelectedPlayers]);

  return (
    <div className={cn("flex-grow relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white py-5 hover:bg-purple-50"
          >
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4 text-purple-800" />
              {effectiveSelectedPlayers.length > 0 ? (
                <span className="truncate">{selectedDisplayText}</span>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className={`ml-2 h-4 w-4 shrink-0 ${effectiveSelectedPlayers.length > 0 ? 'opacity-0' : 'opacity-50'}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" alignOffset={0}>
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Spielername eingeben..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>Kein Spieler gefunden.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = effectiveSelectedPlayers.some(
                    p => p.name === option.player.name
                  );
                  
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleSelect}
                      className={isSelected ? "bg-purple-50" : ""}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{option.label}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({option.player.characterCount} {option.player.characterCount === 1 ? 'Charakter' : 'Charaktere'})
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* {effectiveSelectedPlayers.length > 0 && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClear}
          className="h-9 w-9 rounded-full p-0 absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </Button>
      )} */}
    </div>
  );
}
