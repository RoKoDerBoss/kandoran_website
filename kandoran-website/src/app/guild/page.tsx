import { NavBar } from "@/components/ui/NavBar";

export default function Guild() {
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Die Gilde</h1>
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Welcome to Die Gilde (The Guild), the community of adventurers in the Kandoran world.
          </p>
          <p className="mb-4">
            Here you&apos;ll find information about our members, achievements, and ongoing campaigns.
          </p>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Guild Members</h2>
            <p>Member information will be displayed here.</p>
          </div>
        </div>
      </div>
    </>
  );
} 