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
import { BookmarkPlus, Presentation, Users } from "lucide-react";
import { AdvantageCarouselItems } from "@/lib/utils/advantage_carousel";
import { LucidIcon } from "@/lib/utils/LucidIcon";
export default function Home() {
  
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
  
  return (
    <main className="overflow-x-hidden">
      {/* NavBar Section */}
      <header className="fixed w-full z-10">
        <NavBar />
      </header>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen w-full flex items-center justify-center py-8 md:py-0 border-b-2 border-gray-200"> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6 pt-4 lg:pt-0">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center lg:text-left">
                Erlebe die Magie von Kandoran!
              </h1>
              
              <p className="text-base sm:text-lg text-center lg:text-left">
                Schließe dich unserer lebendigen Dungeons & Dragons-Community auf 
                Discord an. Spiele gemeinsam, entwickle deinen Charakter und erlebe 
                spannende Abenteuer in einer dynamischen Welt.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-1 lg:pt-2 justify-center lg:justify-start">
                <Button>
                  <Link 
                    href="https://discord.com/invite/kZ7tp4JZYX" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Jetzt beitreten
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="border-accent border-1 text-black bg-white">
                  <Link 
                    href="#more-info" 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('more-info');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  > 
                    Mehr erfahren
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* More Info Section */}
      <section id="more-info" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px- sm:px-6 lg:px-8 max-w-[90vw] p-4">
          <div className="flex flex-row sm:flex-col-2 h-[35vh] justify-between items-top">
            <div className="flex flex-col hidden sm:block w-1/2">
              {/* Citation Card */}
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              {/* Project */}
              <div className="flex flex-row items-center space-x-2 mb-4 justify-center lg:justify-start">
                <Presentation className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
                <span className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">Projekt Kandoran</span>
              </div>
              
              {/* Project Description */}
              <div className="mb-10 sm:mb-12">
                <p className="text-sm sm:text-lg text-center lg:text-left mx-auto lg:mx-0 max-w-prose">
                  Die Legenden von Kandoran ist ein D&D 5e Westmarsch Projekt, in welchem Fokus auf Herausforderung, 
                  langfristige Charakterentwicklung und das Bestreiten vielseitiger Missionen gelegt wird. 
                  Die Spielercharaktere sind Teil einer Abenteurergilde und leben zusammen im Hauptquartier der &quot;Loge zur Grauen Hand&quot;.
                </p>
                <p className="text-sm sm:text-lg mt-4 text-center lg:text-left mx-auto lg:mx-0 max-w-prose">
                  Auf gemeinsamen Abenteuern, geleitet von verschiedenen Spielleitern, lernen sich sowohl die Charaktere, als auch die Spieler kennen.
                  Jeder ist auf Kandoran willkommen, ob aufstrebender Neuling, entschlossener Erfahrener oder althergebrachter Veteran.
                </p>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="flex flex-col w-full h-[55vh] justify-between items-top">
            <div className="flex flex-row items-center space-x-2 mb-4 sm:mb-6 justify-center lg:justify-start">
              <BookmarkPlus className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
              <span className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">Vorteile</span>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row items-left p-4 sm:p-6">      
                {/* Carousel */}
                <div className="w-full lg:w-2/3">
                  <Carousel 
                    plugins={[plugin.current]} 
                    className="w-full max-w-[90%] sm:max-w-[95%] mx-auto" 
                    onMouseEnter={plugin.current.stop} 
                    onMouseLeave={plugin.current.reset}
                  >
                    <CarouselContent className="px-1 sm:px-2">
                      {AdvantageCarouselItems.map((item) => (
                        <CarouselItem key={item.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-1 sm:p-2">
                          <Card className="bg-purple-50 mb-2 shadow-md h-full max-w-[300px] sm:max-w-none mx-auto">
                            <CardContent className="flex w-full flex-col aspect-square px-2">
                              <div className="flex flex-col gap-6 text-center items-center justify-center p-2">
                                <span className="text-xl font-semibold font-mono inline-block w-full break-words min-h-[60px]">
                                  {item.header}
                                </span>
                                <LucidIcon name={item.icon} size={80} color="var(--primary)"/>
                                <p className="text-base mx-auto lg:mx-0 max-w-prose text-center">{item.text}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-6 sm:mt-8">
                      <CarouselPrevious className="relative static transform-none mx-1 sm:mx-2 h-8 w-8 sm:h-10 sm:w-10" />
                      <CarouselNext className="relative static transform-none mx-1 sm:mx-2 h-8 w-8 sm:h-10 sm:w-10" />
                    </div>
                  </Carousel>
                </div>
              
                {/* Text */}
                <div className="w-full lg:w-1/3 mb-6 lg:mb-0 hidden sm:block text-center lg:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Was kannst du erwarten?</h2>
                  <p className="text-base sm:text-lg mx-auto lg:mx-0 max-w-prose">
                    In Kandoran warten viele Vorteile und unvergessliche Abenteuer auf dich. Entdecke einen Auszug der Sachen, die auf dich warten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}