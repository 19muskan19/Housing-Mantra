"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AmenitiesList from "@/components/ui/AmenitiesList";

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Responsive Width */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        } md:w-20 lg:w-64 flex-shrink-0 transition-all duration-300`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content - Expands when sidebar is closed */}
      <div className="flex-1 p-6 bg-gray-100 transition-all duration-300">
        <button
          className="md:hidden text-white p-2 rounded mb-4"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
         
        </button>

        <AmenitiesList />
      </div>
    </div>
  );
}
