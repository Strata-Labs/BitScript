import React, { useState } from "react";
import SetZeus from "./SetZeus";
import SetBern from "./SetBern";
import SetPato from "./SetPato";
import { useAtom } from "jotai";
import { hoveredImageMember } from "../atom";

type ImageName = "SetZeus" | "SetBern" | "SetPato";

const PfpTeam = () => {
  const [hoveredImage, setHoveredImage] = useAtom(hoveredImageMember);

  const handleMouseEnter = (img: ImageName) => {
    setHoveredImage(img);
  };

  const handleMouseLeave = () => {
    setHoveredImage("");
  };

  return (
    <div onMouseLeave={handleMouseLeave} className="flex flex-col">
      {hoveredImage === "SetZeus" && <SetZeus />}
      {hoveredImage === "SetBern" && <SetBern />}
      {hoveredImage === "SetPato" && <SetPato />}
      {hoveredImage === "" && (
        <>
          <div className="flex translate-x-[90px] translate-y-[50px] xl:absolute xl:-translate-y-[100px] xl:translate-x-[100px]">
            <img
              src="/Group 48304.svg"
              alt=""
              onMouseEnter={() => handleMouseEnter("SetZeus")}
            />
          </div>

          <div className="flex flex-row  xl:absolute">
            <img
              src="/Group 48305.svg"
              alt=""
              onMouseEnter={() => handleMouseEnter("SetBern")}
            />
            <div className=" xl:absolute xl:translate-x-[200px]">
              <img
                src="/Group 48306.svg"
                alt=""
                onMouseEnter={() => handleMouseEnter("SetPato")}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PfpTeam;
