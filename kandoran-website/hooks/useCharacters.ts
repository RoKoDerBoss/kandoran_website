import useSWR from 'swr';
import { mutate } from 'swr';
import { useState, useEffect } from 'react';

// Define CharacterData type
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

// GitHub username and repo
const repoOwner = 'RoKoDerBoss';
const repoName = 'kandoran_website';
const branch = 'main';
const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/data/characters.json`;

// fetcher with caching and error handling
const fetcher = async (url: string) => {
  try {
    // Try getting from localStorage first if available
    const cachedData = localStorage.getItem('kandoran_characters');
    const cachedTime = localStorage.getItem('kandoran_characters_time');
    
    // Check if we have recent cached data (less than 1 hour old)
    if (cachedData && cachedTime) {
      const ageInMs = Date.now() - parseInt(cachedTime, 10);
      if (ageInMs < 60 * 60 * 1000) { // Less than 1 hour
        return JSON.parse(cachedData);
      }
    }
    
    // Otherwise fetch from GitHub
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch characters');
    
    const data = await res.json();
    
    // Cache the result
    localStorage.setItem('kandoran_characters', JSON.stringify(data));
    localStorage.setItem('kandoran_characters_time', Date.now().toString());
    
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    
    // If we have any cached data, use it as fallback even if it's old
    const cachedData = localStorage.getItem('kandoran_characters');
    if (cachedData) {
      console.log('Using cached data as fallback');
      return JSON.parse(cachedData);
    }
    
    throw error;
  }
};

export function useCharacters(): { 
  characters: CharacterData[]; 
  isLoading: boolean; 
  error: Error | null;
  refetch: () => void;
} {
  // State to hold processed data
  const [processedCharacters, setProcessedCharacters] = useState<CharacterData[]>([]);
  
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000, // Cache for 1 hour
    errorRetryCount: 3
  });
  
  // Pre-process characters data when it changes
  useEffect(() => {
    if (data) {
      // Validate and pre-process data to avoid doing it repeatedly
      const processed = data.filter((char: CharacterData) => 
        char && 
        char.name && 
        char.level && 
        char.class && 
        char.status
      );
      
      setProcessedCharacters(processed);
    }
  }, [data]);
  
  return {
    characters: processedCharacters,
    isLoading,
    error,
    // Add a manual refetch method
    refetch: () => {
      // Clear cache
      localStorage.removeItem('kandoran_characters');
      localStorage.removeItem('kandoran_characters_time');
      // Trigger revalidation
      mutate(url);
    }
  };
}