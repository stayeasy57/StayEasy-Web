import Image from "next/image";
import React from "react";

const ReasonSection = () => {
  return (
    <div className="bg-primary/20 py-12">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-3xl text-center font-bold mb-10 text-primary">
          Reason to Choose Us
        </h1>
        <p className="text-center text-xl max-w-[1200px] mx-auto">
          “Our mission is to simplify the process of finding and managing
          Hostel/PG accommodations. We provide solution to bridges the gap
          between landlords and tenants by offering tailored features for both
          groups. It ensures a seamless experience for tenants searching for
          reliable accommodations and landlords looking to manage their
          properties efficiently"
        </p>
        <div className="flex flex-col items-center justify-center pt-4">
          <div className="bg-primary/30 flex justify-center items-center rounded-full h-[80px] w-[80px] ">
            <Image src="/transparent-logo.png" alt="" width={60} height={60} />
          </div>
          <h3 className="text-xl text-primary mt-1 font-bold">StayEasy</h3>
          <p>Find your stay hassle free!</p>
        </div>
      </div>
    </div>
  );
};

export default ReasonSection;
