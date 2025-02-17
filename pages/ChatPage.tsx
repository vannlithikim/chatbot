import InputText from "@/components/InputText";
import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import React, { useState } from "react";

function ChatPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        {/* Sidebar Component */}
        <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <Logo isCollapsed={isCollapsed} />
      </div>

      {/* Input Field Wrapper (for positioning and width control) */}
      <div className="flex flex-1 items-end justify-center p-4 mb-10">
        <div className="w-[90%] max-w-[800px] mx-auto mr-56">
          {/* Added mr-8 to move to the right */}
          <InputText />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
