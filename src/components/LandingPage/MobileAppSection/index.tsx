import React from "react";
import Image from "next/image";

const MobileAppSection = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 h-[700px] bg-gradient-to-bl from-primary/80 to-primary/10">
      <div className="flex justify-center items-center">
        <div className="flex relative">
          <img
            src="/mbile-app.jpeg"
            alt="mobile-app"
            style={{
              transform: "translate(-66px, 27px)",
            }}
            className="absolute right-[50px] h-[500px]"
          />
          <img
            src="/mobile-app-2.jpeg"
            className="h-[500px]"
            alt="mobile-app"
          />
        </div>
      </div>
      <div className="flex justify-center text-white flex-col">
        <h2 className="text-4xl font-bold my-6">StayEasy Mobile App</h2>
        <p>Available on IOS & Android</p>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <div className="mt-8 flex gap-5">
          <button className="bg-white flex items-center justify-start gap-2 py-2 px-4 rounded-full">
            <Image src="/android.svg" alt="" width={60} height={60} />
            <h3 className="text-primary">
              Get it on <br /> <strong>Google Play</strong>
            </h3>
          </button>
          <button className="bg-white flex items-center justify-start gap-2 py-2 px-4 rounded-full">
            <Image src="/Vector.svg" alt="" width={40} height={40} />
            <h3 className="text-primary">
              Download it on <br /> <strong>App Store</strong>
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSection;
