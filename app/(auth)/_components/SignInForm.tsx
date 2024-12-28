"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SignInFormSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FormInput } from "./form-input";
import { SignInFormProps } from "@/types";
import { Loader2 } from "lucide-react";

const SignInForm = ({ setNext }: SignInFormProps) => {
  const router = useRouter();

  const { loading, login } = useAuth();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    console.log(data);
    try {
      const response = await login(data);

      if (response.success) {
        toast.success(response.message);
        console.log(response);
        setNext(true);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center border rounded-xl h-12">
                  <div className="px-4 flex gap-2">
                    <Image
                      src="/auth/indian-flag.svg"
                      alt="India"
                      width={20}
                      height={20}
                    />
                    <h1 className="text-muted-foreground">+91</h1>
                  </div>
                  <FormInput
                    type="tel"
                    {...field}
                    placeholder="Phone"
                    className="flex-1 h-full focus:outline-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full text-xl py-6 flex items-center justify-center rounded-xl"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex w-full gap-4 items-center justify-center mb-4">
          <div className="h-[1px] w-1/2 bg-[#1E1D1D]" />
          <h1 className="text-xl">or</h1>
          <div className="h-[1px] w-1/2 bg-[#1E1D1D]" />
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 mt-10 h-full"
          disabled={loading}
        >
          <FcGoogle className="w-20 h-20 flex shrink-0" />
          <span className="text-xl">Sign in with Google</span>
        </Button>
      </form>
      <Separator className="mt-10" />
      <div className="mt-5 flex gap-3">
        <h1>New to Puro Taja?</h1>
        <Link
          href="/sign-up"
          className="border-b-2 border-violet text-violet font-medium"
        >
          Create Account
        </Link>
      </div>
    </Form>
  );
};

export default SignInForm;
