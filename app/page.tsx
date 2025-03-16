"use client";

import Sidebar from "@/components/Sidebar";
import AmenitiesList from "@/components/ui/AmenitiesList";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Responsive Width */}
      <div className="w-64 md:w-20 lg:w-64 flex-shrink-0 transition-all duration-300">
        <Sidebar />
      </div>

      {/* Main Content - Adjusting margin for responsive sidebar */}
      <div className="flex-grow p-6 bg-gray-100 transition-all duration-300">
        <AmenitiesList />
      </div>
    </div>
  );
}
