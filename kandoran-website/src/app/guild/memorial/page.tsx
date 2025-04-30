"use client";

import React, { useMemo } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { NavBar } from "@/components/NavBar";
import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from 'next/link';
import { ChevronLeft, Trees } from 'lucide-react';

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

export default function Memorial() {
  // Get characters data
  const { characters, isLoading, error, refetch } = useCharacters();
  
  // Filter dead characters
  const deadChars = useMemo(() => {
    return (characters || []).filter((c: CharacterData) => c.status === 'Dead');
  }, [characters]);

  // Sort dead characters by level for display
  const sortedDeadChars = useMemo(() => {
    return [...deadChars].sort((a, b) => (b.level || 0) - (a.level || 0));
  }, [deadChars]);

  // Animation class
  const fadeInClass = "animate-in fade-in slide-in-from-bottom-4 duration-500";

  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-[1650px] mx-auto">
        {/* Header with back button */}
        <div className="w-full mb-10 md:mb-14">
          <div className="flex items-center mb-2">
            <Link 
              href="/guild" 
              className="text-gray-600 hover:text-purple-800 flex items-center mr-4"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Zurück zur Gilde</span>
            </Link>
          </div>
          
          {/* Header */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center">
              <Trees className="h-8 w-8 mr-3 text-gray-600" />
              <h1 className="text-4xl font-bold mb-6 text-purple-900">Esche der Erinnerungen</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl">
              Hier gedenken wir den gefallenen Mitgliedern der Loge zur Grauen Hand, 
              deren Mut, Stärke und Opfer für immer in unseren Erinnerungen verweilen.
            </p>
          </div>
        </div>
        
        {/* Memorial Content */}
        <section className="w-full">
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
          {!isLoading && !error && (!deadChars || deadChars.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-gray-600 mb-4">Keine verstorbenen Charaktere vorhanden.</p>
            </div>
          )}
          
          {/* Memorial Display */}
          {!isLoading && deadChars && deadChars.length > 0 && (
            <div className="w-full bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
              <div className={`${fadeInClass} space-y-4`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4">
                  {sortedDeadChars.map((character: CharacterData, index: number) => (
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
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
} 