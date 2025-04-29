import CustomSecondaryButton from "@/components/ui/CustomSecondaryButton";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-primary text-white  p-4">
      <div className="flex justify-between items-center max-w-[1600px] mx-auto">
        <div>
          <Link href="/">
            <Image src="/navbar-logo.png" alt="logo" width={70} height={70} />
          </Link>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <CustomSecondaryButton> Login </CustomSecondaryButton>
          </Link>

          <Link href="/signup">
            <CustomSecondaryButton> Register </CustomSecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
