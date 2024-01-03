import React from "react";
import { useAtom } from "jotai";
import { isClickedInfoPopUpOpen } from "../atom";

const InfoButton = () => {
  const [isClickedInfoPopUp, setIsClickedInfoPopUp] = useAtom(
    isClickedInfoPopUpOpen
  );

  const handleClickInfo = () => {
    setIsClickedInfoPopUp(!isClickedInfoPopUp);
  };

  return (
    <button
      className={`flex h-[48px] w-[48px] items-center justify-center rounded-full ${
        isClickedInfoPopUp ? "bg-black text-white" : "bg-[#F3F3F3] text-black"
      }`}
      onClick={handleClickInfo}
    >
      {isClickedInfoPopUp ? "X" : "i"}
    </button>
  );
};

export default InfoButton;
