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
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Define a more specific type for character objects
interface CharacterData {
  name?: string;
  id?: string;
  [key: string]: unknown;
}

interface CharacterSearchProps {
  characters: CharacterData[];
  onSelect: (character: CharacterData) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchCharacter({
  characters,
  onSelect,
  onClear,
  placeholder = "Suche nach Charakteren...",
  className,
}: CharacterSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedCharacter, setSelectedCharacter] = React.useState<CharacterData | null>(null)
  const [searchValue, setSearchValue] = React.useState("")

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

  const handleSelect = React.useCallback((currentValue: string) => {
    const selected = characterOptions.find(option => option.value === currentValue)
    
    if (selected) {
      setSelectedCharacter(selected.character)
      onSelect(selected.character)
      setOpen(false)
    }
  }, [characterOptions, onSelect])
  
  const handleClear = React.useCallback(() => {
    setSelectedCharacter(null)
    setSearchValue("")
    onClear()
  }, [onClear])

  // Handle search input change
  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="relative w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between py-5 bg-white"
            >
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-purple-800" />
                {selectedCharacter ? (
                  <span className="truncate">{selectedCharacter.name}</span>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput 
                placeholder="Charaktername eingeben..." 
                value={searchValue} 
                onValueChange={handleSearchChange}
              />
              <CommandEmpty>Kein Charakter gefunden.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-y-auto">
                {characterOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCharacter?.id === option.character.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {selectedCharacter && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClear}
          className="h-9 w-9 rounded-full p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 