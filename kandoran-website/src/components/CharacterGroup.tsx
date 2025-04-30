import React, { memo } from 'react';
import { CharacterCard } from './CharacterCard/CharacterCard';

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

interface CharacterGroupProps {
  groupName: string;
  characters: CharacterData[];
  showGroupName: boolean;
  index: number;
}

const CharacterGroup = memo(({
  groupName,
  characters,
  showGroupName,
  index
}: CharacterGroupProps) => {
  const fadeInClass = "animate-in fade-in slide-in-from-bottom-4 duration-500";
  
  return (
    <div className={`${fadeInClass} space-y-4`} style={{ animationDelay: `${index * 100}ms` }}>
      {showGroupName && (
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">{groupName}</h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full justify-items-center sm:justify-items-stretch gap-6 grid-flow-row">
        {characters.map((character, charIndex) => (
          <div 
            key={character.id || charIndex} 
            className="flex align-top w-auto relative"
          >
            <CharacterCard 
              character={character}
              className="h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

CharacterGroup.displayName = 'CharacterGroup';

export default CharacterGroup;