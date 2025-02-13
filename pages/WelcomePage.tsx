import React from "react";
import Image from "next/image";
import InputText from "@/components/InputText";

const WelcomePage = () => {
  return (
    <section className="">
      {/* Chat BOT heading at the top left */}
      <h1 className="text-[#F9EF19] font-bold text-2xl pl-4 pt-4">Chat BOT</h1>

      {/* Logo centered horizontally but positioned below the heading */}
      <div className="flex flex-col justify-center items-center mt-28">
        <Image src="/Logo.png" alt="Logo" width={110.94} height={92} />
        <p className="text-center pt-4 font-bold text-[48px]">
          Welcome to <span className="text-[#F9EF19] ">Chat BOT</span>
        </p>
        <p className="text-center font-[20px]">&quot;Smart, fast, and always ready to help&quot;</p>
      </div>

      <div className="py-11 mx-96">
        <InputText />
      </div>
    </section>
  );
};

export default WelcomePage;
