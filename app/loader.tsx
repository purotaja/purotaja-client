"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const StylishLoader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background to-background/50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-full h-full max-w-screen-lg min-h-svh md:max-h-screen flex flex-col items-center justify-center gap-8">
        <div className="relative">
          {/* Main logo */}
          <Image
            src="/logo/logo.svg"
            alt="Loader"
            width={150}
            height={150}
            className="animate-pulse md:block hidden"
            priority
          />
          <Image
            src="/logo/logo.svg"
            alt="Loader"
            width={90}
            height={90}
            className="animate-pulse md:hidden"
            priority
          />
          
          {/* Animated rings */}
          <div className="absolute inset-0 -z-10 animate-ping opacity-75">
            <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ripple" />
          </div>
          <div className="absolute inset-0 -z-20 animate-ping opacity-50 delay-150">
            <div className="absolute inset-0 border-4 border-violet/80 rounded-full animate-ripple" />
          </div>
          <div className="absolute inset-0 -z-30 animate-ping opacity-25 delay-300">
            <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ripple" />
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-foreground font-medium text-lg tracking-wider">
          {Array.from("Purotaja...").map((letter, index) => (
            <span
              key={index}
              className={cn("inline-block animate-bounce text-violet text-xl", index > 3 && "text-green-600")}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylishLoader;