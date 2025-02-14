import React from "react";
import Image from "next/image";
import { Share } from "lucide-react";

function Logo() {
  return (
    <div className="flex p-4 justify-between items-center w-full ml-[20%]">
      <div className="h-full flex flex-row items-center flex-1">
        {/* Logo */}
        <Image src="/Logo.png" alt="Logo" width={62} height={48} />
        {/* Text Container */}
        <div className="pl-2">
          <span className="text-md font-bold text-[#F9EF19]">AI FARM</span>
          <div className="text-md text-white font-bold">ROBOTICS</div>
        </div>
      </div>
      {/* Share Button */}
      <button className="flex items-center text-black bg-[#F9EF19] py-2 px-4 rounded-full text-[15px] font-medium">
        <Share className="h-4 w-4 mr-2 " />
        Share
      </button>
    </div>
  );
}

export default Logo;
