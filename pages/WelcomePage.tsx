import React from "react";
import Image from "next/image";
import InputText from "@/components/InputText";
import { featureData } from "@/constants/data";
import { FeatureInfo } from "@/types/index";

const WelcomePage = () => {
  return (
    <section className="">
      {/* Chat BOT heading at the top left */}
      <header className="text-[#F9EF19] font-bold text-2xl pl-4 pt-4">Chat BOT</header>

      {/* Logo centered horizontally but positioned below the heading */}
      <div className="flex flex-col justify-center items-center mt-20">
        <Image src="/Logo.png" alt="Logo" width={100.94} height={82} />
        <p className="text-center pt-4 font-bold text-[38px]">
          Welcome to <span className="text-[#F9EF19] ">Chat BOT</span>
        </p>
        <p className="text-center font-[10px]">
          &quot;Smart, fast, and always ready to help&quot;
        </p>
      </div>

      {/* Input field to type and send messages */}
      <div className="py-10 mx-96">
        <InputText />
      </div>

      {/* Info Feature */}
      <div className="flex flex-row justify-center gap-14 text-center py-8">
        {featureData.map((item: FeatureInfo, index: number) => (
          <div key={index} className="flex flex-col items-center max-w-[300px] gap-2">
            <item.icon size={25} className="" />
            <p className="text-[16px] font-bold truncate">{item.title}</p>
            <p className="text-[14px] line-clamp-3">{item.description}</p>
          </div>
        ))}
      </div>

      {/* accept the term policy */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 text-center">
        <p>
          By messaging ChatBOT, you agree to our 
          <a
            href="#"
            className="underline text-[#F9EF19] hover:text-[#00BFFF] "
          >
            Terms 
          </a>
          and have read our 
          <a href="#" className="underline text-[#F9EF19] hover:text-[#00BFFF]">
            Privacy Policy
          </a>
        </p>
      </footer>
    </section>
  );
};

export default WelcomePage;
