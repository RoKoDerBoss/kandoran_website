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
  characters: CharacterData[];
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
    const options = Array.from(playerMap.entries())
      .map(([name, characterCount]) => ({
        label: name,
        value: name,
        player: { name, characterCount }
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    
    return options;
  }, [characters])

  // Filter player options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) {
      return playerOptions;
    }
    
    const filtered = playerOptions.filter(option => 
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return filtered;
  }, [playerOptions, searchQuery]);

  const handleSelect = useCallback((currentValue: string) => {
    // Try to find exact match first
    let selected = playerOptions.find(option => option.value === currentValue);
    
    // If no exact match, try case-insensitive match
    if (!selected) {
      selected = playerOptions.find(option => 
        option.value.toLowerCase() === currentValue.toLowerCase()
      );
    }
    
    // If still no match, try partial match (if name is included in the value)
    if (!selected) {
      selected = playerOptions.find(option => 
        currentValue.toLowerCase().includes(option.value.toLowerCase()) ||
        option.value.toLowerCase().includes(currentValue.toLowerCase())
      );
    }
    
    if (selected) {
      // Check if already selected
      const isAlreadySelected = effectiveSelectedPlayers.some(
        p => p.name === selected.player.name
      );

      let newSelected: PlayerData[];
      
      if (isAlreadySelected) {
        // Remove from selection
        newSelected = effectiveSelectedPlayers.filter(
          p => p.name !== selected.player.name
        );
      } else {
        // Add to selection
        newSelected = [...effectiveSelectedPlayers, selected.player];
      }
      
      // Update the selection state
      if (onMultiSelect) {
        onMultiSelect(newSelected);
      } else {
        setInternalSelectedPlayers(newSelected);
      }
      
      // Call onSelect for backward compatibility
      if (!isAlreadySelected) {
        onSelect(selected.player);
      }
      
      // If we just removed the last item, call onClear
      if (newSelected.length === 0) {
        onClear();
      }
      
      // Close the popover after selection
      setOpen(false);
    } else {
      // No matching option found - silently fail
    }
  }, [playerOptions, effectiveSelectedPlayers, onSelect, onMultiSelect, onClear]);
  
  const handleClear = useCallback(() => {
    // Immediately update UI state
    if (onMultiSelect) {
      onMultiSelect([]);
    } else {
      setInternalSelectedPlayers([]);
    }
    
    // Clear search query
    setSearchQuery("");
    
    // Call onClear callback
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
      
      {effectiveSelectedPlayers.length > 0 && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClear}
          className="h-9 w-9 rounded-full p-0 absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <X className="h-4 w-4 text-gray-700 hover:text-gray-800" />
        </Button>
      )}
    </div>
  );
}
