import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import React from "react";

function ChatPage() {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <SideBar />

      {/* Main Content Area */}
      <Logo />

      {/** */}
    </div>
  );
}

export default ChatPage;
