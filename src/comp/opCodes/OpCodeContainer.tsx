import React, { useState } from "react";
import Link from "next/link";
import ImageOpCodeComponent from "./ImageOpCodeComponent";

interface OpCodeContainerProps {
  name: string;
  shortDescription: string;
  category: string;
  type: string;
  linkPath: string;
  image: string;
  tileImage: any;
  alt: string;
  hoverImage: string;
}

const OpCodeContainer: React.FC<OpCodeContainerProps> = ({
  name,
  shortDescription,
  category,
  type,
  linkPath,
  image,
  tileImage,
  alt,
  hoverImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={linkPath} target="_blank">
      <div className="flex w-screen justify-center md:w-full">
        {/* General white background container */}
        <div
          className="group mx-[80px] flex h-[200px] w-full flex-col justify-between rounded-xl bg-white from-[#100F20] to-[#321B3A] p-4 px-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-b md:h-[200px] md:w-[274px] md:rounded-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col items-center">
            {/* Title */}
            <p className="w-full overflow-hidden text-ellipsis text-center  text-[26px] font-medium text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white">
              {name}
            </p>
            {/* The Container and the image */}
            {/* <div className="flex w-full justify-center">
              <ImageOpCodeComponent
                name={name}
                tileImage={tileImage}
                imageUrl={""}
                hoverImageUrl={""}
                isHovered={isHovered}
              />
            </div> */}
            {/* Summary */}
            <p className="mt-4 text-center text-[14px] font-light text-[#111827] transition-all duration-500 ease-in-out group-hover:text-white md:mt-5">
              {shortDescription}
            </p>
          </div>
          {/* Bottom part of the container */}
          <div className="mx-4 flex items-center justify-between space-x-1 md:mx-6">
            {/* Left Rectangle circle with grayish background */}
            <div className="flex h-[27px] w-[80px] items-center justify-center rounded-full bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#3E314A] ">
              <p className="text-[12px] font-extralight text-[#6C5E70] transition-all duration-500 ease-in-out group-hover:text-[#FFFFFF]">
                {category}
              </p>
            </div>
            {/* Right Rectangle circle with grayish background */}
            <div className="flex h-[27px] w-[80px] items-center justify-center rounded-full bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#3E314A] ">
              <p className="text-[12px] font-extralight text-[#6C5E70] transition-all duration-500 ease-in-out group-hover:text-[#FFFFFF]">
                {type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpCodeContainer;
