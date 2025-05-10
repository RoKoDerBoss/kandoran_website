import { CitationCard } from "@/components/CitationCard";
import { NavBar } from "@/components/NavBar";
import Image from "next/image";

export default function Compendia() {
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Compendia</h1>
        <Image src="/kandoran_map.webp" alt="" width={1000} height={100} className="rounded-lg shadow-lg mb-8" />
        <div className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">
            This page will contain references, guides, and information about the Kandoran universe.
          </p>
        </div>
        <CitationCard>
          Hello, Test.
        </CitationCard>
      </div>
    </>
  );
} 