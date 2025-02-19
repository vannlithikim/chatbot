import React from "react";
import Image from "next/image";
import { Share } from "lucide-react";

function Logo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div
      className={`flex p-6 justify-between items-center w-full transition-all duration-300 ease-in-out ${
        isCollapsed ? "mx-[10%]" : "ml-[20%]"
      }`}
    >
      <div className="h-full flex items-center flex-1">
        {/* Show Logo only when not collapsed */}
        {!isCollapsed && (
          <Image src="/Logo.png" alt="Logo" width={62} height={48} />
        )}
        {/* Text Container */}
        <div className={`pl-2 ${isCollapsed ? "flex items-center gap-1" : ""}`}>
          <span className="text-lg font-bold text-[#F9EF19]">
            AI FARM
          </span>
          {/* When collapsed, keep in one row, otherwise two rows */}
          {isCollapsed ? (
            <span className="text-lg text-white font-bold">ROBOTICS</span>
          ) : (
            <div className="text-lg text-white font-bold">ROBOTICS</div>
          )}
        </div>
      </div>
      {/* Share Button */}
      <button className="flex items-center text-black bg-[#F9EF19] py-2 px-4 rounded-full text-[15px] font-medium">
        <Share className="h-4 w-4 mr-2" />
        Share
      </button>
    </div>
  );
}

export default Logo;
