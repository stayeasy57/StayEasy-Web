import { Button } from "primereact/button";
import React from "react";

// utils
import { Cities } from "@/utils/global";

const CitySection = () => {
  return (
    <div className="p-12 max-w-[1700px] mx-auto">
      <h1 className="text-3xl text-center font-bold mb-10">
        Top Student Cities
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {Cities.map((item, index) => {
          return (
            <div className="shadow-2xl rounded-4xl py-8 px-8" key={index}>
              <h3 className="text-xl text-center mb-3">{item.name}</h3>
              <img
                src={item.image}
                alt=""
                className="rounded-3xl h-[200px]"
                width={300}
              />

              <div className="flex justify-center pt-3 mt-2">
                <Button
                  label="See Hostels"
                  className="bg-primary !font-light !rounded-4xl !py-1 "
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CitySection;
