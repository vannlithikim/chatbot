import InputText from "@/components/InputText";
import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import React, { useState } from "react";

function ChatPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false); // Track if message is sent

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleMessageSend = () => {
    setHasSentMessage(true); // After message is sent, hide welcome text
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        {/* Sidebar Component */}
        <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <Logo isCollapsed={isCollapsed} />
      </div>

      {/* Welcome Text: Hide it after the user sends a message */}
      {!hasSentMessage && (
        <div
          className={`flex flex-col items-center justify-center flex-1 ${
            isCollapsed ? "ml-30" : "ml-56"
          }`}
        >
          <p className="text-3xl font-bold mb-4">
            Chat <span className="text-[#F9EF19]">BOT</span>
          </p>
          <p className="text-xl font-semibold">How can I help you today?</p>
        </div>
      )}

      {/* Chat Interface (No Scroll Here) */}
      <div className="flex-1 overflow-y-auto p-4 mb-5">
        <div
          className={`w-[90%] max-w-[800px] mx-auto ${
            isCollapsed ? "mr-35" : "mr-56"
          }`}
        >
          <InputText onMessageSend={handleMessageSend} isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
