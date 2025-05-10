"use client"

import React from "react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { BookmarkPlus, Presentation } from "lucide-react";
export default function Home() {
  
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
  
  return (
    <main className="overflow-x-hidden">
      {/* NavBar Section */}
      <header className="fixed w-full z-10">
        <NavBar />
      </header>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen w-full flex items-center justify-center py-8 md:py-0"> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Image - Now appears first on mobile */}
          <div className="flex items-center justify-center order-1 lg:order-2 mt-14 lg:mt-0">
            <div className="rounded-2xl outline-2 outline-accent overflow-hidden shadow-xl max-w-full">
              <Image
                src="/kandoran_hero1.webp"
                alt="Map of Kandoran"
                width={800}
                height={534}
                className="object-contain w-full h-auto" 
                priority
              />
            </div>
          </div>
             
          {/* Hero Text */}
          <div className="flex flex-col justify-center p-8 min-h-screen">
            <div className="flex justify-center h-full pl-16 mt-16 mb-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800">
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
            <div className="inline-block">
              <Image
                src="/kandoran_hero1.webp"
                alt="Map of Kandoran"
                width={800}         // The image’s natural size
                height={534}
                className="object-contain max-w-full h-auto rounded-2xl outline-2 outline-accent" 
                priority
              />
            </div>
          </div>
        
        </div>
      </section>
      
      {/* More Info Section */}
      <section id="more-info" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left">Mehr Informationen</h2>
          
          {/* Project */}
          <div className="flex flex-row space-x-2 justify-start items-center">
            <Presentation className="w-8 h-8 text-[var(--primary)]" />
            <span className="text-2xl font-bold text-[var(--primary)]">Projekt Kandoran</span>
          </div>
          
          {/* Project Description */}
          <div className="mb-10 sm:mb-12">
            <p className="text-base sm:text-lg text-center lg:text-left mx-auto lg:mx-0 max-w-prose">
              Die Legenden von Kandoran ist ein D&D 5e Westmarsch Projekt, in welchem Fokus auf Herausforderung, 
              langfristige Charakterentwicklung und das Bestreiten vielseitiger Missionen gelegt wird. 
              Die Spielercharaktere sind Teil einer Abenteurergilde und leben zusammen im Hauptquartier der &quot;Loge zur Grauen Hand&quot;.
            </p>
            <p className="text-base sm:text-lg mt-4 text-center lg:text-left mx-auto lg:mx-0 max-w-prose">
              Auf gemeinsamen Abenteuern, geleitet von verschiedenen Spielleitern, lernen sich sowohl die Charaktere, als auch die Spieler kennen.
              Jeder ist auf Kandoran willkommen, ob aufstrebender Neuling, entschlossener Erfahrener oder althergebrachter Veteran.
            </p>
          </div>
          
          {/* Advantages */}
          <div className="flex flex-row space-x-2 justify-start items-center">
            <BookmarkPlus className="w-8 h-8 text-[var(--primary)]" />
            <span className="text-2xl font-bold text-[var(--primary)]">Vorteile</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 rounded-2xl bg-purple-50 border-1 pl-4">
          {/* Text */}
          <div className="flex flex-col justify-top items-center w-1/3">
              <h2 className="text-xl font-bold">Header</h2>
              <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
          {/* Carousel */}
            <div className="flex h-full w-2/3 px-16 justify-center items-center">
              <div className="flex w-full justify-center items-center py-2">
                <Carousel 
                  plugins={[plugin.current]} 
                  className="w-full max-w-[90%] sm:max-w-[95%] mx-auto" 
                  onMouseEnter={plugin.current.stop} 
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent className="px-1 sm:px-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 p-1 sm:p-2">
                        <Card className="bg-gray-100 shadow-md h-full max-w-[300px] sm:max-w-none mx-auto">
                          <CardHeader className="p-3 sm:p-6">
                            <CardTitle className="text-center">
                              <span className="text-lg sm:text-xl lg:text-2xl font-semibold">Header</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex items-center justify-center p-2 sm:p-6 aspect-[4/3] sm:aspect-square">
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-2 sm:mt-4">
                    <CarouselPrevious className="relative static transform-none mx-1 sm:mx-2 h-8 w-8 sm:h-10 sm:w-10" />
                    <CarouselNext className="relative static transform-none mx-1 sm:mx-2 h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
