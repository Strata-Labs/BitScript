import React from "react";

interface ImageOpCodeProps {
  imageUrl: string;
  alt: string;
}

const ImageOpCodeComponent: React.FC<ImageOpCodeProps> = ({
  imageUrl,
  alt,
}) => {
  return (
    // General purplish container for the Op Code image
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-3 mt-6 flex h-[123px] w-[full] flex-col items-center justify-center rounded-lg bg-[#F4F4F4] transition-all duration-500 ease-in-out group-hover:bg-[#321B3A] md:w-[253px]">
        <div className="mt-5 h-full w-full items-center justify-center p-2">
          <img src={imageUrl} alt={alt} />
        </div>
      </div>
    </div>
  );
};

export default ImageOpCodeComponent;
