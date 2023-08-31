import Image from "next/image";
import React from "react";

interface OpCodeContainerProps {
  name: string;
  tileImage: any;
  imageUrl: string;
  hoverImageUrl: string;
  isHovered: boolean;
}

import TileImage from "@/../public/images/HASH_160_TILE_IMG.svg";

const ImageOpCodeComponent = ({
  name,
  tileImage,
  imageUrl,
  hoverImageUrl,
  isHovered,
}: OpCodeContainerProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`mx-3 mt-6 flex h-[123px] w-[full] flex-col items-center justify-center rounded-lg bg-[#F4F4F4] transition-all duration-500 ease-in-out ${
          isHovered ? "bg-[#321B3A]" : ""
        } md:w-[253px]`}
      >
        <div className="mt-5 h-full w-full items-center justify-center p-2">
          <Image src={tileImage} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default ImageOpCodeComponent;
