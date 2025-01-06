"use client";

import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "../user-nav";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const LoginOrAccount = () => {
  const { isLoggedIn } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
  
      return () => clearTimeout(timer);
    }, []);

  if (isLoading) return (
    <div className="w-full items-center flex justify-end gap-5 px-1">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <div className="w-full items-center flex justify-end gap-5 px-1 pr-5">
      {isLoggedIn ? (
        <>
          <UserNav />
          <CartItem />
        </>
      ) : (
        <>
          <Link href="/sign-in">
            <Button className="w-full">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginOrAccount;
