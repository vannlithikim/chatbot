import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { chatMessages } from "@/constants/data";
import {
  Ellipsis,
  PanelLeftOpen,
  PanelRightOpen,
  SquarePen,
} from "lucide-react";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null); // New state for clicked chat

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMessageClick = (index: number) => {
    // Set the active chat index when clicked
    setActiveChatIndex(index);
  };

  return (
    <div
      className={`fixed h-screen bg-[#1C1C1C] text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-[20%]"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          {isCollapsed ? (
            <Image src="/Logo.png" alt="Logo" width={40} height={40} />
          ) : (
            <span className="text-xl font-bold text-[#F9EF19]">
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
          <SquarePen
            className={`transition-all duration-300 ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`}
          />
        </button>

        {/* "Today" text below "Add New Chat" button, only when expanded */}
        {!isCollapsed && (
          <div className="mx-4 pt-10">
            <div className="flex justify-between">
              <p className="text-sm text-gray-300 font-bold">Today</p>
              <p className="font-bold text-[#F9EF19] text-sm">Clear</p>
            </div>

            {/* Chat History */}
            <div className="bg-[#414141] w-full h-auto mt-7  rounded-lg p-2 text-[14px]">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-row justify-between items-center px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#373737]  relative 
                  ${activeChatIndex === index ? 'bg-[#313131]' : ''}`} // Highlight when selected
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => handleMessageClick(index)} // Set active chat on click
                >
                  {/* Text container */}
                  <p className="w-[90%] overflow-hidden whitespace-nowrap text-gray-200">
                    {message}
                  </p>

                  {/* Show ellipsis button only on hover or click */}
                  {(activeIndex === index || activeChatIndex === index) && (
                    <button className="absolute right-3">
                      <Ellipsis className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default SideBar;
