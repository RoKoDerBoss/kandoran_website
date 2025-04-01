import { NavBar } from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* NavBar Section */}
      <header className="fixed w-full z-10">
        <NavBar />
      </header>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen"> {/* Added padding-top for fixed navbar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">     
          {/* Hero Text */}
          <div className="flex flex-col justify-center p-8 min-h-screen">
            <div className="flex justify-center h-full pl-16 mt-16 mb-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight">
                  Erlebe die Magie von Kandoran! ✨
                </h1>
                
                <p className="text-lg">
                  Schließe dich unserer lebendigen Dungeons & Dragons-Community auf 
                  Discord an. Spiele gemeinsam, entwickle deinen Charakter und erlebe 
                  spannende Abenteuer in einer dynamischen Welt.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button asChild className="text-white">
                    <Link 
                      href="https://discord.com/invite/kZ7tp4JZYX" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Jetzt beitreten
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="border-accent border-1 text-black bg-white">
                    <Link href="#more-info"> 
                      Mehr erfahren
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center mb-49 mt-49">
            {/* 
              inline-block keeps the container only as large as the image.
              overflow-hidden + rounded + border for styling.
            */}
            <div className="inline-block rounded-2xl outline-2 outline-accent overflow-hidden shadow-xl">
              <Image
                src="/kandoran_hero1.webp"
                alt="Map of Kandoran"
                width={800}         // The image’s natural size
                height={534}
                className="object-contain max-w-full h-auto" 
                priority
              />
            </div>
          </div>
        
        </div>
      </section>
      
      {/* More Info Section */}
      <section id="more-info" className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 mt-8">Mehr Informationen</h2>
          {/* More content here */}
        </div>
      </section>
    </main>
  );
}
