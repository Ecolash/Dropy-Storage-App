"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { OTPModal } from "@/components/OTPModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
return z.object({
    email: z.string().email(),
    fullName:
        formType === "sign-up"
            ? z.string().min(2).max(50)
            : z.string().optional(),
    mobile:         
        formType === "sign-up" ?
            z.string().regex(/^\d{10}$/, "Invalid mobile number") :
            z.string().optional(),
});
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountID, setaccountID] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => 
    {
        console.log("Full Name:", values.fullName);
        console.log("Mobile Number:", values.mobile);
        console.log("Email:", values.email);
        setIsLoading(true);
        setErrorMessage("");

        try {
          const user = type === "sign-up"? await createAccount(
            {
                fullName: values.fullName || "",
                mobile: values.mobile || "",
                email: values.email
            }) : 
            await signInUser({ email: values.email });
          if(accountID === null) setErrorMessage('User not found!');
          console.log("accountID:", user.accountID);
          setaccountID(user.accountID);
        }
        catch {
          console.log("Failed to create account");
          setErrorMessage('Failed to create account');

        }
        finally {
          setIsLoading(false);
        }
       
    };

  return (
    <div className="w-full flex justify-center items-center">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="text-[30px] lg:text-[40px] xl:text-[50px] font-bold">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full h-auto px-2">
                  <div className="shad-form-item w-full pb-4 pt-4">
                    <FormLabel className="text-[18px] py-2 font-semibold">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="bg-none w-full py-3 mb-3 border-none bg-indigo-100 outline-none"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="w-full h-auto px-2">
                  <div className="shad-form-item w-full pb-4 pt-4">
                    <FormLabel className="text-[18px] py-2 font-semibold">Phone Number</FormLabel>

                    <FormControl>
                      <div className="flex flex-row items-center bg-indigo-100 py-0 mb-3">
                        <p className="mr-2 my-0 py-0 flex-shrink-0 font-bold">🇮🇳  +91</p>
                        <Input
                          placeholder="Enter your phone number"
                          className="bg-none w-full border-none outline-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full h-auto px-2">
                  <div className="shad-form-item w-full pb-4 pt-4">
                    <FormLabel className="text-[18px] py-2 font-semibold">Email</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="bg-none w-full py-3 mb-3 border-none bg-indigo-100 outline-none"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="text-red-500 font-semibold text-center mb-1 text-[15px]">{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      {accountID && (<OTPModal email={form.getValues('email')} accountID={accountID} />)}
    </div>
  );
};

export default AuthForm;