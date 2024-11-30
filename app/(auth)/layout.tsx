'use client'

import React from "react";
import Image from "next/image";
import { CloudDownload, FileCheck2, Globe2Icon, Info, Share2Icon } from "lucide-react";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
    <section className="hidden w-2/5 items-center justify-center bg-brand lg:flex xl:w-1/3 ml-0 mr-0 pl-0 pr-0">
        <div className="flex max-h-[800px] w-full flex-col justify-center space-y-3 xl:space-y-2 m-0 p-0">
        <Image
                src="/assets/icons/logo-full.svg"
                alt="logo"
                width={184}
                height={62}
                className="h-auto m-2 ml-5 mr-5"
        />

        <div className="space-y-2 text-white ml-5 mr-5">
                <h2 className="h2 animate-fade-in">Drop your files in a go</h2>
                <p className="body-1 animate-fade-in-delayed">
                Securely store, share and manage your files with ease with our cloud storage solution.
                </p>
        </div>
        <div className="flex justify-center">
            <Image
            src="/assets/images/cloud-gif-transparent.gif"
            alt="Files"
            width={400}
            height={300}
            className="transition-all w-full scale-120"
            />
        </div>
        <div className="mt-8 m-5">
        <div
            id="features-toggle"
            className="flex items-center cursor-pointer px-4 py-2 rounded-xl bg-subbrand text-white hover:bg-blue-900 ml-auto"
            onClick={() => {
            const modal = document.getElementById("features-modal");
            if (modal) modal.classList.toggle("hidden");
            }}
        >
            <h4 className="h4">Features</h4>
            <Info className="ml-2" size={20} />
        </div>

        <div
            id="features-modal"
            className="mt-2 space-y-1 bg-subbrand p-4 rounded-xl shadow-lg"
        >
            <ul className="space-y-1 body-2 xl:body-1 text-white">
            <li className="flex items-center">
                <CloudDownload className="mr-2" size={20} />
                Store any file with 100MB of free storage
            </li>
            <li className="flex items-center">
                <Share2Icon className="mr-2" size={20} />
                Easy file sharing on a click
            </li>
            <li className="flex items-center">
                <FileCheck2 className="mr-2" size={20} />
                Designed for easy file management
            </li>
            <li className="flex items-center">
                <Globe2Icon className="mr-2" size={20} />
                Access from anywhere in any device
            </li>
            </ul>
        </div>
        </div>
        </div>
    </section>

    <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0 bg-indigo-100">
        <div className="mb-16 lg:hidden">
        <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
        />
        </div>
        <div className="mt-8 ">
        {children}
        </div>
    </section>
    </div>
  );
};

export default Layout;