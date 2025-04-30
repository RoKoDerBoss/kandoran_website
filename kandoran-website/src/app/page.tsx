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
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-3xl font-bold mb-8 mt-8">Mehr Informationen</h2>
          {/* More content here */}
          {/* Project */}
          <div className="flex flex-row space-x-2 justify-start items-center">
            <Presentation className="w-8 h-8 text-[var(--primary)]" />
            <span className="text-3xl font-bold text-[var(--primary)]">Projekt Kandoran</span>
          </div>
          {/* Project Description */}
          <div className="flex flex-col gap-2 mb-8">
            <p className="text-lg">Die Legenden von Kandoran ist ein D&D 5e Westmarsch Projekt, in welchem Fokus auf Herausforderung, 
              langfristige Charakterentwicklung und das Bestreiten vielseitiger Missionen gelegt wird. 
              Die Spielercharaktere sind Teil einer Abenteurergilde und leben zusammen im Hauptquartier der &quot;Loge zur Grauen Hand&quot;.
              
              Auf gemeinsamen Abenteuern, geleitet von verschiedenen Spielleitern, lernen sich sowohl die Charaktere, als auch die Spieler kennen.
              Jeder ist auf Kandoran willkommen, ob aufstrebender Neuling, entschlossener Erfahrener oder althergebrachter Veteran. </p>
          </div>
          {/* Advantages */}
          <div className="flex flex-row space-x-2 justify-start items-center">
            <BookmarkPlus className="w-8 h-8 text-[var(--primary)]" />
            <span className="text-3xl font-bold text-[var(--primary)]">Vorteile</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 rounded-2xl bg-purple-50 border-1 pl-4">
          {/* Text */}
          <div className="flex flex-col justify-top items-center w-1/3">
              <h2 className="text-3xl font-bold">Header</h2>
              <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
          {/* Carousel */}
            <div className="flex h-full w-2/3 px-16 justify-center items-center">
              <div className="flex w-full justify-center items-center py-2">
                <Carousel 
                  plugins={[plugin.current]} 
                  className="w-full h-full min-w-md" 
                  onMouseEnter={plugin.current.stop} 
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index ) => (
                      <CarouselItem key={index} role="region" className="basis-full lg:basis-1/3">
                        <div className="p-1">
                          <Card className="bg-gray-100 shadow-md">
                            <CardHeader>
                              <CardTitle>
                                <div className="flex justify-center items-center">
                                  <span className="text-2xl font-semibold">Header</span>
                                </div>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex aspect-square items-center justify-center">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
