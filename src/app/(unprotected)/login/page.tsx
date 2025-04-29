import FooterLandingPage from "@/components/LandingPage/FooterLandingPage";
import Header from "@/components/LandingPage/Header";
import Login from "@/components/Login";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <Login />
      <FooterLandingPage />
    </div>
  );
};

export default LoginPage;
