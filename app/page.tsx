"use client";

import { useState } from "react";
import AmenitiesList from "@/components/ui/AmenitiesList";
import Sidebar from "@/components/SideBar";

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div
        className={`${isSidebarOpen ? "w-64" : "w-0 md:w-64 overflow-hidden"
          } fixed md:relative top-0 left-0 h-full bg-white z-50 shadow-lg transition-all duration-300`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="flex-1 p-6 bg-gray-100 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:ml-0 ml-6">
          <AmenitiesList />
        </div>
      </div>
    </div>
  );
}
