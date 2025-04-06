"use client";

import { NavBar } from "@/components/ui/NavBar";
import { CharacterCard } from "@/components/ui/CharacterCard";

// Example character data
const exampleCharacter = {
  "id": "129069595",
  "name": "Kasim Aldahr",
  "race": "Human",
  "level": 9,
  "class": "Rogue",
  "subclass": "Assassin", // Note: fixed typo in property name from 'sublcass' to 'subclass'
  "secondary_class": "Ranger",
  "secondary_subclass": "Gloom Stalker",
  "gold": 594,
  "status": "Active",
  "avatar_url": "https://www.dndbeyond.com/avatars/43264/121/1581111423-129069595.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
  "exp": 159,
  "games": 12,
  "last_game": "27.03.2025",
  "buddies": "Agis, Alva, Brock, Brogar, Cortinus, Elkas, Fenvys, Fex, Grygor, Hiks, Janosch, Kelvyr, Kilgrin, Kovu, Quira, Rogar, Seamol, Tavas, Thoroth, Xanvira, Yix",
  "player": "Captain"
};
const exampleCharacter2 = {
  "id": "129070497",
    "name": "Janosch Silver",
    "race": "Human",
    "level": 8,
    "class": "Paladin",
    "subclass": "Glory",
    "secondary_class": "Barbarian",
    "secondary_subclass": "",
    "gold": 104,
    "status": "Inactive",
    "avatar_url": "https://www.dndbeyond.com/avatars/47292/526/1581111423-129070497.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
    "exp": 138,
    "games": 21,
    "last_game": "02.04.2025",
    "buddies": "Agis, Alva, Brock, Brogar, Brummar, Cortinus, Dain, Eliza, Elkas, Fenvys, Fex, Grygor, Hovas, Kasim, Kell, Kelvyr, Kilgrin, Quira, Tavas, Tralin, Ves",
    "player": "Niclas"
};
const exampleCharacter3 = {
  "id": "128845831",
    "name": "Lumaer Nosas",
    "race": "Wood Elf",
    "level": 4,
    "class": "Fighter",
    "subclass": "Battle Master",
    "secondary_class": "",
    "secondary_subclass": "",
    "gold": 185,
    "status": "Dead",
    "avatar_url": "https://www.dndbeyond.com/avatars/43264/947/1581111423-128845831.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
    "exp": 35,
    "games": 1,
    "last_game": "30.12.2024",
    "buddies": "Alva, Grygor, Kasim, Tavas",
    "player": "Niclas"
};

// Define prop types for the Guild component
interface GuildProps {
  size?: "sm" | "md" | "lg";
}

export default function Guild({ size = "md" }: GuildProps) {
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Die Gilde</h1>
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Guild Members</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {/* Example character card */}
              <CharacterCard 
                character={exampleCharacter} 
                size={size}
                onBuddyClick={(buddy) => console.log(`Clicked on buddy: ${buddy}`)}
              />
              <CharacterCard 
                character={exampleCharacter2} 
                size={size}
                onBuddyClick={(buddy) => console.log(`Clicked on buddy: ${buddy}`)}
              />
              <CharacterCard 
                character={exampleCharacter3} 
                size={size}
                onBuddyClick={(buddy) => console.log(`Clicked on buddy: ${buddy}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 