"use client";

import CustomSecondaryButton from "@/components/ui/CustomSecondaryButton";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="bg-primary text-white  p-4">
      <div className="flex justify-between items-center max-w-[1600px] mx-auto">
        <div>
          <Link href="/">
            <Image src="/navbar-logo.png" alt="logo" width={70} height={70} />
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div>LoggedIn as: {user?.fullName} </div>
            <CustomSecondaryButton onClick={handleLogout}>
              Logout
            </CustomSecondaryButton>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link href="/login">
              <CustomSecondaryButton> Login </CustomSecondaryButton>
            </Link>

            <Link href="/signup">
              <CustomSecondaryButton> Register </CustomSecondaryButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
