import Image from "next/image";
import React from "react";

interface HeadCardInterface {
  title: string;
  description: string;
  icon: any;
}

const HeadCard = ({ title, description, icon }: HeadCardInterface) => {
  return (
    <div className="p-8 bg-primary h-[200px] rounded-md">
      <div className="p-2 bg-white w-[48px] h-[48px] rounded-lg">
        <div className="w-full h-full flex flex-1 justify-center items-center place-items-start">
          <Image src={icon} alt="icons" />
        </div>
      </div>
      <div className="text-white mt-3">
        <h2 className="font-semibold">{title}</h2>
        <p className=" font-light ">{description}</p>
      </div>
    </div>
  );
};

export default HeadCard;
