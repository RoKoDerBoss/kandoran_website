import { NavBar } from "@/components/ui/NavBar";

export default function Statistics() {
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Statistik</h1>
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Welcome to the Kandoran Statistics page, where you can track progress and achievements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Players</h2>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Sessions</h2>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 