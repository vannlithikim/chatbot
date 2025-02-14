import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PanelLeftOpen, PanelRightOpen, SquarePen } from "lucide-react";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`fixed h-screen bg-[#1C1C1C] text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          {isCollapsed ? (
            <Image src="/Logo.png" alt="Logo" width={40} height={40} />
          ) : (
            <span className="text-xl font-bold">
              Chat<span className="text-[#F9EF19]">BOT</span>
            </span>
          )}
        </Link>

        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-700 focus:outline-none ml-[47%]"
          >
            <PanelRightOpen className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Collapse Button Below Logo (when collapsed) */}
      {isCollapsed && (
        <div className="flex items-center justify-center p-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-700 focus:outline-none"
          >
            <PanelLeftOpen className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Add New Chat Button */}
      <nav className="mt-4">
        <button
          className={`w-[87%] mx-auto flex items-center justify-center p-3 bg-white hover:bg-[#F9EF19] text-black rounded h-10 ${
            isCollapsed ? "justify-center" : "justify-between px-4"
          }`}
        >
          {/* "Add New Chat" text aligned to the left */}
          {!isCollapsed && (
            <span className="mr-2 text-sm font-semibold">Add New Chat</span>
          )}

          {/* SquarePen icon aligned to the right */}
          <SquarePen className={`transition-all duration-300 ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`} />
        </button>
      </nav>
      
    </div>
  );
}

export default SideBar;
