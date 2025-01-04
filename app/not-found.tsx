"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Top decorative element */}
        <div className="relative h-48 w-full flex items-center justify-center">
          <span className="md:text-[180px] text-[140px] font-bold text-violet/10 absolute">
            404
          </span>
          <Image
            src="/logo/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className="relative z-10 animate-pulse"
          />
        </div>

        {/* Main content */}
        <div className="space-y-4">
          <h1 className="md:text-4xl text-3xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-customGray md:text-lg max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="min-w-[160px] border-violet text-violet hover:bg-violet/10"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="min-w-[160px] bg-violet hover:bg-violet/90"
          >
            Return Home
          </Button>
          <Button className="hidden">
            hello
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full">
            <div className="w-[800px] h-[800px] rounded-full bg-violet/5 blur-3xl" />
          </div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full">
            <div className="w-[800px] h-[800px] rounded-full bg-violet/5 blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}