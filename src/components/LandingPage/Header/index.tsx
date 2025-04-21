import CustomSecondaryButton from "@/components/ui/CustomSecondaryButton";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-primary text-white flex justify-between items-center p-4">
      <div>
        <Image src="/navbar-logo.png" alt="logo" width={70} height={70} />
      </div>
      <div className="flex gap-3">
        <CustomSecondaryButton> Login </CustomSecondaryButton>
        <CustomSecondaryButton> Register </CustomSecondaryButton>
      </div>
    </div>
  );
};

export default Header;
