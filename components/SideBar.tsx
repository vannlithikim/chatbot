import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { chatMessages } from "@/constants/data";
import {
  Ellipsis,
  PanelLeftOpen,
  PanelRightOpen,
  Search,
  SquarePen,
} from "lucide-react";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const handleMessageClick = (index: number) => setActiveChatIndex(index);

  // Debugging useEffect
  useEffect(() => {
    console.log("activeIndex:", activeIndex);
    console.log("activeChatIndex:", activeChatIndex);
  }, [activeIndex, activeChatIndex]);

  // Ensure `chatMessages` is an array and log it
  useEffect(() => {
    console.log("chatMessages:", chatMessages);
  }, []);

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
          <div className="flex items-center justify-between space-x-1">
            {/* Search Icon */}
            <button className="p-2 rounded hover:bg-gray-700 focus:outline-none">
              <Search className="w-6 h-6" />
            </button>

            {/* Toggle Sidebar Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <PanelRightOpen className="w-6 h-6" />
            </button>
          </div>
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
          {!isCollapsed && (
            <span className="mr-2 text-sm font-semibold">Add New Chat</span>
          )}
          <SquarePen
            className={`transition-all duration-300 ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`}
          />
        </button>

        {/* "Today" text and Chat History */}
        {!isCollapsed && (
          <div className="mx-4 pt-10">
            <div className="flex justify-between">
              <p className="text-sm text-gray-300 font-bold">Today</p>
              <p className="font-bold text-[#F9EF19] text-sm">Clear</p>
            </div>

            {/* Chat History */}
            <div className="bg-[#414141] w-full h-auto mt-7 rounded-lg p-2 text-[14px]">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-row justify-between items-center px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#373737] relative ${
                    activeChatIndex === index ? "bg-[#313131]" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => handleMessageClick(index)}
                >
                  <p className="w-[85%] overflow-hidden whitespace-nowrap text-gray-200">
                    {message}
                  </p>
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
