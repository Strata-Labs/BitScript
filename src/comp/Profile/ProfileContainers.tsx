import React from "react";
import Link from "next/link";

type ScriptContainerProps = {
  active: string;
  isBtc: boolean;
  title: string;
  price: number | null;
  frequency: string;
  features: string[];
  onClick: () => void;
};

const ProfileContainer: React.FC<ScriptContainerProps> = ({
  active,
  isBtc,
  title,
  price,
  frequency,
  features,
  onClick,
}) => {
  return (
    <div className="">
      {/* General white background container */}
      <button
        className={`mx-4 mb-5 flex h-[430px] w-[150px]  flex-col rounded-xl from-[#100F20] to-[#321B3A] p-4 px-5 md:h-[410px] md:w-[250px] lg:h-fit lg:w-[300px] ${
          active === "0" ? "bg-[#F3F3F3]" : "bg-gradient-to-b"
        }`}
        onClick={() => onClick()}
      >
        <div className="flex flex-col items-center text-[12px] md:text-[14px] lg:text-[16px]">
          {/* Title */}
          <p
            className={`text-center  font-extralight  ${
              active === "0" ? "text-[#111827]" : "text-white"
            }`}
          >
            {title}
          </p>
          <p
            className={`mt-5  text-center font-bold  ${
              active === "0" ? "text-[#111827]" : "text-white"
            }`}
          >
            {price !== -1 ? (isBtc ? `${price} BTC ` : `$${price}`) : "N/A"}
            <span className="font-extralight">{frequency}</span>
          </p>
          <div className="mt-2"></div>

          <div className="flex h-[35px] w-[120px] cursor-pointer items-center justify-center rounded-full bg-[#F79327] text-[10px] text-white md:w-[161px] md:text-[14px]">
            Get Started
          </div>

          <div className="mt-5 items-start">
            {features.map((feature, index) => (
              <p
                key={index}
                className={`mt-3 flex flex-row items-center font-extralight  ${
                  active === "0" ? "text-[#111827]" : "text-white"
                }`}
              >
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="#0C071D"
                  xmlns="http://www.w3.org/2000/svg"
                  className={` mr-2 font-extralight  ${
                    active === "0" ? "" : "fill-white"
                  }`}
                >
                  <path d="M4.49999 9.79148C4.49916 9.79148 4.49832 9.79148 4.49749 9.79148C4.33082 9.79065 4.17166 9.72398 4.05416 9.60482L0.720825 6.21981C0.478325 5.97397 0.481661 5.57816 0.727494 5.33566C0.973328 5.094 1.36999 5.09649 1.61166 5.34232L4.5025 8.27898L12.3908 0.390645C12.635 0.146478 13.0308 0.146478 13.275 0.390645C13.5192 0.634811 13.5192 1.03067 13.275 1.27484L4.94166 9.60817C4.82499 9.72567 4.66583 9.79148 4.49999 9.79148Z" />
                </svg>
                {feature}
              </p>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProfileContainer;
