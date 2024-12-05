import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/search";
import FileUploader from "@/components/fileUpload";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountID,
}: {
  userId: string;
  accountID: string;
}) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader/>
        {/* <FileUploader ownerId={userId} accountID={accountID} /> */}
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
                <div className="relative group">
                <Button type="submit" className="sign-out-button">
                  <Image
                  src="/assets/icons/logout.svg"
                  alt="Sign Out"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  />
                </Button>
                <span className="absolute w-[70px] text-center bottom-full left-1/2 transform -translate-x-1/2 mb-0.5 px-2 py-1 text-xs font-semibold text-white bg-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  Sign Out
                </span>
                </div>
        </form>
      </div>
    </header>
  );
};
export default Header;
