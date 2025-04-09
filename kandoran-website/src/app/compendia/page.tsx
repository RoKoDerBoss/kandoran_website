import { NavBar } from "@/components/ui/NavBar";
import { CharacterCard } from "@/components/CharacterCard";

export default function Compendia() {
  const character = {
    "id": "129069595",
    "name": "Kasim Aldahr",
    "race": "Human",
    "level": 9,
    "class": "Rogue",
    "subclass": "Assassin",
    "secondary_class": "Ranger",
    "secondary_subclass": "Gloom Stalker",
    "gold": 594,
    "status": "Active",
    "avatar_url": "https://www.dndbeyond.com/avatars/43264/121/1581111423-129069595.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
    "exp": 159,
    "games": 12,
    "last_game": "27.03.2025",
    "buddies": "Agis, Alva, Brock, Brogar, Cortinus, Elkas, Fenvys, Fex, Grygor, Hiks, Janosch, Kelvyr, Kilgrin, Kovu, Quira, Rogar, Seamol, Tavas, Thoroth, Xanvira, Yix",
    "player": "Captain "
  };

  const character2 = {
    "id": "129070497",
    "name": "Janosch Silver",
    "race": "Human",
    "level": 8,
    "class": "Paladin",
    "subclass": "Glory",
    "secondary_class": "",
    "secondary_subclass": "",
    "gold": 104,
    "status": "Active",
    "avatar_url": "https://www.dndbeyond.com/avatars/47292/526/1581111423-129070497.jpeg?width=150&height=150&fit=crop&quality=95&auto=webp",
    "exp": 141,
    "games": 21,
    "last_game": "07.04.2025",
    "buddies": "Agis, Alva, Brock, Brogar, Brummar, Cortinus, Dain, Eliza, Elkas, Fenvys, Fex, Grygor, Hovas, Kasim, Kell, Kelvyr, Kilgrin, Quira, Tavas, Tralin, Ves",
    "player": "Niclas"
  }
  
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Compendia</h1>
        <div className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Welcome to the Kandoran Compendia, your source for all knowledge related to our world.
          </p>
          <p className="mb-4">
            This page will contain references, guides, and information about the Kandoran universe.
          </p>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <CharacterCard character={character}/>
            <CharacterCard character={character2}/>
            
          </div>
        </div>
      </div>
    </>
  );
} 