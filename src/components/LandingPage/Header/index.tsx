import CustomSecondaryButton from "@/components/ui/CustomSecondaryButton";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-primary text-white  p-4">
      <div className="flex justify-between items-center max-w-[1600px] mx-auto">
        <div>
          <Image src="/navbar-logo.png" alt="logo" width={70} height={70} />
        </div>
        <div className="flex gap-3">
          <CustomSecondaryButton> Login </CustomSecondaryButton>
          <CustomSecondaryButton> Register </CustomSecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
