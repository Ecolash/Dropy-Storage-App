"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

// import { Separator } from "@radix-ui/react-separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/fileUpload";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  $id: string;
  accountID: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNav = ({
  $id: ownerID,
  accountID,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <div className="flex justify-start">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={100}
        height={10}
        className="w-auto py-2 h-auto"
      />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            {/* <Separator className="mb-4 bg-light-200/20" /> */}
          </SheetTitle>

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active",
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active",
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          {/* <Separator className="my-5 bg-light-200/20" /> */}

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerID={ownerID} accountID={accountID} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={signOutUser}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
