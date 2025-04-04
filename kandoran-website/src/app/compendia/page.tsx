import { NavBar } from "@/components/ui/NavBar";

export default function Compendia() {
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Compendia</h1>
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Welcome to the Kandoran Compendia, your source for all knowledge related to our world.
          </p>
          <p className="mb-4">
            This page will contain references, guides, and information about the Kandoran universe.
          </p>
        </div>
      </div>
    </>
  );
} 