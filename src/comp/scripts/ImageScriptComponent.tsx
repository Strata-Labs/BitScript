import React from "react";

interface ImageScriptComponentProps {
  name: string;
  imageSrcAlt: string;
}

const ImageScriptComponent: React.FC<ImageScriptComponentProps> = ({
  name,
  imageSrcAlt,
}) => {
  return (
    // General Container
    <div className="mt-4 flex h-[123px] w-full items-center justify-center rounded-lg bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#321B3A] md:h-[123px] md:w-[253px]">
      <img src={imageSrcAlt} alt={name} />
    </div>
  );
};

export default ImageScriptComponent;
