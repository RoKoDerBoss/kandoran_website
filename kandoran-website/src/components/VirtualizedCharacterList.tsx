// components/VirtualizedCharacterList.tsx
import React, { memo, useEffect, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";

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

interface VirtualizedCharacterListProps {
  characters: CharacterData[];
  columnCount?: number;
}

const VirtualizedCharacterList = memo(({
  characters, 
  columnCount = 5  // Default to 5 columns on large screens
}: VirtualizedCharacterListProps) => {
  // State for responsive column count and container dimensions
  const [columns, setColumns] = useState(columnCount);
  const [containerWidth, setContainerWidth] = useState(1200); // Default width
  
  // Item dimensions - adjust as needed based on your card design
  const itemWidth = Math.floor(containerWidth / columns);
  const itemHeight = 320; // Fixed height for each character card
  
  // Calculate list dimensions
  const rowCount = Math.ceil(characters.length / columns);
  const listHeight = Math.min(window.innerHeight * 0.7, rowCount * itemHeight);
  
  // Update dimensions when window resizes
  useEffect(() => {
    const handleResize = () => {
      // Responsive column count based on screen width
      let newColumns = columnCount;
      const width = window.innerWidth;
      
      if (width < 640) newColumns = 1;      // sm
      else if (width < 768) newColumns = 2; // md
      else if (width < 1024) newColumns = 3; // lg
      else if (width < 1280) newColumns = 4; // xl
      
      setColumns(newColumns);
      setContainerWidth(width < 1650 ? width - 48 : 1650 - 48); // Account for container padding
    };
    
    // Set initial values
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [columnCount]);
  
  // Render each cell (character card)
  const Cell = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
    const index = rowIndex * columns + columnIndex;
    
    // Return nothing for out-of-bounds indices
    if (index >= characters.length) {
      return null;
    }
    
    const character = characters[index];
    
    return (
      <div style={{
        ...style,
        padding: '8px'
      }}>
        <CharacterCard 
          character={character}
          className="h-full w-full"
        />
      </div>
    );
  };
  
  return (
    <FixedSizeGrid
      columnCount={columns}
      columnWidth={itemWidth}
      rowCount={rowCount}
      rowHeight={itemHeight}
      height={listHeight}
      width={containerWidth}
    >
      {Cell}
    </FixedSizeGrid>
  );
});

// Add displayName for debugging
VirtualizedCharacterList.displayName = 'VirtualizedCharacterList';

export default VirtualizedCharacterList;