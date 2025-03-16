"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart,
  User,
  Users,
  Briefcase,
  List,
  Activity,
  DollarSign,
  Calendar,
  Clipboard,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  FileText,
} from "lucide-react";



interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isSidebarOpen, setSidebarOpen }: SidebarProps) {
  const [isProjectOpen, setProjectOpen] = useState(false);
  const [isDeveloperOpen, setDeveloperOpen] = useState(false);

  const handleToggle = (section: string) => {
    if (section === "developer") {
      setDeveloperOpen((prev) => !prev);
    } else if (section === "project") {
      setProjectOpen((prev) => !prev);
    }
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded z-50"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 shadow-lg p-4 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:w-20 lg:w-64`}
      >
        {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
            HM
          </div>
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">Housing Mantra</h2>
            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-3">
            <li>
              <Link href="/stats" className="flex items-center space-x-2">
                <BarChart size={20} />
                <span className="hidden md:inline">Stats</span>
              </Link>
            </li>

            <li>
              <Link href="/admin" className="flex items-center space-x-2">
                <User size={20} />
                <span>Admin</span>
              </Link>
            </li>
            <li>
              <Link href="/agent" className="flex items-center space-x-2">
                <User size={20} />
                <span>Agent</span>
              </Link>
            </li>
            <li>
              <Link href="/owner" className="flex items-center space-x-2">
                <User size={20} />
                <span>Owner</span>
              </Link>
            </li>
            <li>
              <Link href="/team" className="flex items-center space-x-2">
                <Users size={20} />
                <span>Team</span>
              </Link>
            </li>

            {/* Developer Section */}
            <li>
              <button
                onClick={() => handleToggle("developer")}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Briefcase size={20} />
                  <span>Developer</span>
                </div>
                {isDeveloperOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {isDeveloperOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link href="/projects" className="flex items-center space-x-2">
                      <Briefcase size={20} />
                      <span>Developer1</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/property" className="flex items-center space-x-2">
                      <Briefcase size={20} />
                      <span>Developer2</span>
                    </Link>
                  </li>
                  </ul>
              )}
            </li>

            {/* Project Section */}
            <li>
              <button
                onClick={() => handleToggle("project")}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <List size={20} />
                  <span>Project</span>
                </div>
                {isProjectOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {isProjectOpen && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link href="/listing" className="flex items-center space-x-2">
                      <List size={20} />
                      <span>Project1</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/listing" className="flex items-center space-x-2">
                      <List size={20} />
                      <span>Project2</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
                 {/* Other Links */}
                 <li>
              <Link href="/leads" className="flex items-center space-x-2">
                <Home size={20} />
                <span>Property</span>
              </Link>
            </li>
            <li>
              <Link href="/customer" className="flex items-center space-x-2">
                <FileText size={20} />
                <span>Listing </span>
              </Link>
            </li>

            {/* Other Links */}
            <li>
              <Link href="/leads" className="flex items-center space-x-2">
                <Activity size={20} />
                <span>Leads</span>
              </Link>
            </li>
            <li>
              <Link href="/customer" className="flex items-center space-x-2">
                <Users size={20} />
                <span>Customer</span>
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="flex items-center space-x-2">
                <BarChart size={20} />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link href="/sales" className="flex items-center space-x-2">
                <DollarSign size={20} />
                <span>Sales</span>
              </Link>
            </li>
            <li>
              <Link href="/income" className="flex items-center space-x-2">
                <DollarSign size={20} />
                <span>Income Generated</span>
              </Link>
            </li>
            <li>
              <Link href="/site-visit" className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>Site Visit</span>
              </Link>
            </li>
            <li>
              <Link href="/booking" className="flex items-center space-x-2">
                <Clipboard size={20} />
                <span>Booking</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      </>
  );
}

