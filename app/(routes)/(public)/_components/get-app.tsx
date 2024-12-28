import Image from "next/image";
import React from "react";

const GetApp = () => {
  return (
    <section className="w-full mt-10 md:mt-14 bg-gradient-to-r from-[#73549854] to-[#EFEBF354]">
      <div className="w-full max-w-screen-2xl mx-auto px-5 md:px-20 flex flex-col md:flex-row items-center justify-between py-6">
        <div className="w-full md:w-[40%] h-1/2 md:h-full flex items-center md:justify-end justify-center">
          <Image src={"/home/get-app/mobile.png"} alt="mobile" height={300} width={300} className="shrink-0 select-none" />
        </div>
        <div className="w-full md:w-[60%] h-1/2 md:h-full flex flex-col gap-3 md:px-20 md:text-start text-center">
          <h1 className="text-3xl font-bold">Get the PuroTaja app</h1>
          <p className="text-lg line-clamp-none">
            Download the Purotaja app from the Play Store and get fresh, high-quality fish delivered to your doorstep.
            Experience convenience like never before with exciting features and updates coming your way!
          </p>
          <h2 className="text-sm">Download app from</h2>
          <Image src={"/home/get-app/googleplay.png"} alt="googleplay" height={100} width={100} className="shrink-0 self-center md:self-start" />
        </div>
      </div>
    </section>
  );
};

export default GetApp;