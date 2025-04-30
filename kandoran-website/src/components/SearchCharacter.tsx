"use client"

import * as React from "react"
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

interface CharacterSearchProps {
  characters: CharacterData[];
  onSelect: (character: CharacterData) => void;
  onClear: () => void;
  onMultiSelect?: (characters: CharacterData[]) => void;
  selectedCharacters?: CharacterData[];
  placeholder?: string;
  className?: string;
  resetKey?: number;
}

export function SearchCharacter({
  characters,
  onSelect,
  onClear,
  onMultiSelect,
  selectedCharacters = [],
  placeholder = "Suche nach Charakteren...",
  className,
  resetKey = 0,
}: CharacterSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [internalSelectedCharacters, setInternalSelectedCharacters] = 
    React.useState<CharacterData[]>(selectedCharacters)

  // Use external or internal selected characters based on which is provided
  const effectiveSelectedCharacters = selectedCharacters.length > 0 
    ? selectedCharacters 
    : internalSelectedCharacters

  // Reset search when resetKey changes
  React.useEffect(() => {
    if (resetKey > 0) {
      setSearchQuery("");
      setInternalSelectedCharacters([]);
    }
  }, [resetKey]);

  // Create an array of valid character names for search
  const characterOptions = React.useMemo(() => 
    characters
      .filter(char => char.name)
      .map(char => ({
        label: char.name || "",
        value: char.id || char.name || "",
        character: char
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    [characters]
  )

  // Filter character options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return characterOptions;
    
    return characterOptions.filter(option => 
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [characterOptions, searchQuery]);

  const handleSelect = React.useCallback((currentValue: string) => {
    const selected = characterOptions.find(option => option.value === currentValue)
    
    if (selected) {
      // Check if already selected
      const isAlreadySelected = effectiveSelectedCharacters.some(
        c => c.id === selected.character.id
      )

      if (isAlreadySelected) {
        // Remove from selection
        const newSelected = effectiveSelectedCharacters.filter(
          c => c.id !== selected.character.id
        )
        
        if (onMultiSelect) {
          onMultiSelect(newSelected)
        } else {
          setInternalSelectedCharacters(newSelected)
        }

        // If we just removed the last item, also call onClear
        if (newSelected.length === 0) {
          onClear()
        }
      } else {
        // Add to selection
        const newSelected = [...effectiveSelectedCharacters, selected.character]
        
        if (onMultiSelect) {
          onMultiSelect(newSelected)
        } else {
          setInternalSelectedCharacters(newSelected)
        }
        
        // Also call onSelect for backward compatibility
        onSelect(selected.character)
      }
    } else {
      handleClear()
    }
  }, [characterOptions, effectiveSelectedCharacters, onSelect, onMultiSelect, onClear])
  
  const handleClear = React.useCallback(() => {
    setSearchQuery("")
    
    if (onMultiSelect) {
      onMultiSelect([])
    } else {
      setInternalSelectedCharacters([])
    }
    
    onClear()
  }, [onClear, onMultiSelect])

  // Get display text for selected characters
  const selectedDisplayText = React.useMemo(() => {
    if (effectiveSelectedCharacters.length === 0) return "";
    if (effectiveSelectedCharacters.length === 1) return effectiveSelectedCharacters[0].name;
    if (effectiveSelectedCharacters.length === 2) return `${effectiveSelectedCharacters[0].name} & ${effectiveSelectedCharacters[1].name}`;
    return `${effectiveSelectedCharacters[0].name}, ${effectiveSelectedCharacters[1].name} & ${effectiveSelectedCharacters.length - 2} weitere ausgewählt`;
  }, [effectiveSelectedCharacters])

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
              {effectiveSelectedCharacters.length > 0 ? (
                <span className="truncate">{selectedDisplayText}</span>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className={`ml-2 h-4 w-4 shrink-0 ${effectiveSelectedCharacters.length > 0 ? 'opacity-0' : 'opacity-50'}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" alignOffset={0}>
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Charaktername eingeben..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>Kein Charakter gefunden.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = effectiveSelectedCharacters.some(
                    c => c.id === option.character.id
                  )
                  
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
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {effectiveSelectedCharacters.length > 0 && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClear}
          className="h-9 w-9 rounded-full p-0 absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 