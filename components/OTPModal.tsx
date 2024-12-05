'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { sendEmailOTP, verifyOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export const OTPModal = ({accountID, email} : { accountID :string, email: string}) => {
    const Router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [otp, setOTP] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [resendTimer, setResendTimer] = useState(20);

    useEffect(() => {
        if (resendTimer > 0) {
            const timerId = setInterval(() => {
                setResendTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [resendTimer]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        console.log("OTP:", otp);
        try {
            const sessionID = await verifyOTP(accountID, otp);
            if(sessionID)  Router.push("/");
        } catch {
            setErrorMessage("Failed to verify OTP! Please try again.");
        }
    
        setIsLoading(false);
    }

    const HandleResendOTP = async ( ) => {
        setResendTimer(20);
        await sendEmailOTP({ email });
    }


    return (
        <AlertDialog open = {isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="relative flex justify-center">
                    <AlertDialogTitle className="h2 w-full text-center">
                        Verify your OTP
                       <Image
                        src="/assets/icons/close-dark.svg"
                        alt="Close"
                        width={24}
                        height={24}
                        onClick={() => { 
                            setIsOpen(false); 
                        }}
                        className="otp-close-button"
                    />
                    </AlertDialogTitle>
                    <AlertDialogDescription className="subtitle-2 text-center text-subbrand-100">
                       We've sent a 6-digit OTP to <span className="text-brand pl-1">{email}</span>.
                       <br />
                       Check your spam folder if you don't see the email in your inbox.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <InputOTP maxLength={6} value={otp} onChange={setOTP}>
                <InputOTPGroup className="shad-otp sm:text-blue-500">
                    <InputOTPSlot index={0} className="shad-otp-slot"/>
                    <InputOTPSlot index={1} className="shad-otp-slot"/>
                    <InputOTPSlot index={2} className="shad-otp-slot"/>
                    <InputOTPSlot index={3} className="shad-otp-slot"/>
                    <InputOTPSlot index={4} className="shad-otp-slot"/>
                    <InputOTPSlot index={5} className="shad-otp-slot"/>
                </InputOTPGroup>
                </InputOTP>
                <AlertDialogFooter>
                    <div className="flex flex-col w-full gap-1">
                        {errorMessage && (
                            <div className="text-red-500 font-semibold text-center mb-1 text-[15px]">
                                {errorMessage}
                            </div>
                        )}
                        <AlertDialogAction className="shad-submit-btn h-12 mx-10" onClick={handleSubmit} type="button"> 
                            Submit 
                            {isLoading && (
                                <Image 
                                    src="/assets/icons/loader.svg"
                                    alt="loader"
                                    width={24}
                                    height={24}
                                    className="ml-2 animate-spin"
                                />
                            )}
                        </AlertDialogAction>
                    <div className="subtitle-2 mt-2 text-center text-subbrand-100">
                        Didn't receive the OTP?
                        {resendTimer > 0 ? (
                            <span className="text-brand font-semibold"> Resend OTP in {Math.floor(resendTimer / 60)}:{String(resendTimer % 60).padStart(2, '0')} </span>
                        ) : (
                            <Button type="button" variant="link" className="text-brand font-semibold" onClick={HandleResendOTP}> Resend OTP </Button>
                        )}
                    </div>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};


