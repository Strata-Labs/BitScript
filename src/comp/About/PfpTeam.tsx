import { useAtom } from "jotai";
import React, { useState } from "react";
import { teamMemberAtom } from "../atom";

const PfpTeam = () => {
  const [hoveredImage, setHoveredImage] = useAtom(teamMemberAtom);

  const handleImageHover = (imageId: string) => {
    setHoveredImage(imageId);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const showAllImages = hoveredImage === null;

  return (
    <div className="flex flex-col items-center lg:ml-[120px]">
      <div className="flex">
        <img
          src="/Setzeus.png"
          alt="SetZeus"
          className={`-mb-10 h-[100px] w-[100px] transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 md:h-[150px] md:w-[150px] ${
            !showAllImages && hoveredImage !== "SetZeus" ? "opacity-10" : ""
          }`}
          onMouseEnter={() => handleImageHover("SetZeus")}
          onMouseLeave={handleImageLeave}
        />
      </div>

      <div className="flex flex-row">
        <img
          src="/SetBern.png"
          alt="SetBern"
          className={`h-[100px] w-[100px] transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 md:h-[150px] md:w-[150px] ${
            !showAllImages && hoveredImage !== "SetBern" ? "opacity-10" : ""
          }`}
          onMouseEnter={() => handleImageHover("SetBern")}
          onMouseLeave={handleImageLeave}
        />
        <img
          src="/SetPato.png"
          alt="SetPato"
          className={`h-[100px] w-[100px] transition-all duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 md:h-[150px] md:w-[150px] ${
            !showAllImages && hoveredImage !== "SetPato" ? "opacity-10" : ""
          }`}
          onMouseEnter={() => handleImageHover("SetPato")}
          onMouseLeave={handleImageLeave}
        />
      </div>
    </div>
  );
};

export default PfpTeam;
