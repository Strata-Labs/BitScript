import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { menuOpen } from "./atom";

interface ViewButtonsProps {
  buttonOneClick: () => void;
  buttonTwoClick: () => void;
}

const ViewButtons: React.FC<ViewButtonsProps> = ({
  buttonOneClick,
  buttonTwoClick,
}) => {
  const [activeButton, setActiveButton] = useState(1);
  const isMenuOpen = useAtomValue(menuOpen);

  if (isMenuOpen) {
    // Menu is open, hide the component
    return null;
  }

  const handleFirstButtonClick = () => {
    setActiveButton(1);
    buttonOneClick();
  };

  const handleSecondButtonClick = () => {
    setActiveButton(2);
    buttonTwoClick();
  };

  return (
    <div className="flex lg:items-end">
      <button
        className={`group flex items-center border border-[#6C5E70] border-opacity-50 bg-transparent ${
          activeButton === 1 ? "border-black border-opacity-90" : ""
        } right-0 -mt-6 ml-2 flex h-[30px] w-[30px] items-center justify-center rounded-lg hover:border-opacity-100 lg:mt-6 lg:h-[38px] lg:w-[38px]`}
        onClick={handleFirstButtonClick}
      >
        <svg
          className={`text-[#6C5E70] group-hover:opacity-100 ${
            activeButton === 1 ? "text-black opacity-90" : "opacity-50"
          } flex md:h-[14px] md:w-[14px] lg:h-[20px] lg:w-[20px]`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.5 10.75H15.5C14.091 10.75 13.25 9.909 13.25 8.5V5.5C13.25 4.091 14.091 3.25 15.5 3.25H18.5C19.909 3.25 20.75 4.091 20.75 5.5V8.5C20.75 9.909 19.909 10.75 18.5 10.75ZM15.5 4.75C14.911 4.75 14.75 4.911 14.75 5.5V8.5C14.75 9.089 14.911 9.25 15.5 9.25H18.5C19.089 9.25 19.25 9.089 19.25 8.5V5.5C19.25 4.911 19.089 4.75 18.5 4.75H15.5ZM8.5 10.75H5.5C4.091 10.75 3.25 9.909 3.25 8.5V5.5C3.25 4.091 4.091 3.25 5.5 3.25H8.5C9.909 3.25 10.75 4.091 10.75 5.5V8.5C10.75 9.909 9.909 10.75 8.5 10.75ZM5.5 4.75C4.911 4.75 4.75 4.911 4.75 5.5V8.5C4.75 9.089 4.911 9.25 5.5 9.25H8.5C9.089 9.25 9.25 9.089 9.25 8.5V5.5C9.25 4.911 9.089 4.75 8.5 4.75H5.5ZM18.5 20.75H15.5C14.091 20.75 13.25 19.909 13.25 18.5V15.5C13.25 14.091 14.091 13.25 15.5 13.25H18.5C19.909 13.25 20.75 14.091 20.75 15.5V18.5C20.75 19.909 19.909 20.75 18.5 20.75ZM15.5 14.75C14.911 14.75 14.75 14.911 14.75 15.5V18.5C14.75 19.089 14.911 19.25 15.5 19.25H18.5C19.089 19.25 19.25 19.089 19.25 18.5V15.5C19.25 14.911 19.089 14.75 18.5 14.75H15.5ZM8.5 20.75H5.5C4.091 20.75 3.25 19.909 3.25 18.5V15.5C3.25 14.091 4.091 13.25 5.5 13.25H8.5C9.909 13.25 10.75 14.091 10.75 15.5V18.5C10.75 19.909 9.909 20.75 8.5 20.75ZM5.5 14.75C4.911 14.75 4.75 14.911 4.75 15.5V18.5C4.75 19.089 4.911 19.25 5.5 19.25H8.5C9.089 19.25 9.25 19.089 9.25 18.5V15.5C9.25 14.911 9.089 14.75 8.5 14.75H5.5Z" />
        </svg>
      </button>
      <button
        className={`group flex items-center border border-[#6C5E70] border-opacity-50 bg-transparent ${
          activeButton === 2 ? "border-black border-opacity-90" : ""
        } right-0 -mt-6 ml-1 mr-12 h-[30px] w-[30px] items-center justify-center rounded-lg hover:border-opacity-100 md:flex lg:ml-2 lg:mt-6 lg:h-[38px] lg:w-[38px]`}
        onClick={handleSecondButtonClick}
      >
        <svg
          className={`text-[#6C5E70] ${
            activeButton === 2 ? "text-black opacity-90" : "opacity-50"
          } flex  group-hover:opacity-100 md:h-[14px] md:w-[14px] lg:h-[20px] lg:w-[20px]`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.5 10.75H5.5C4.091 10.75 3.25 9.909 3.25 8.5V5.5C3.25 4.091 4.091 3.25 5.5 3.25H18.5C19.909 3.25 20.75 4.091 20.75 5.5V8.5C20.75 9.909 19.909 10.75 18.5 10.75ZM5.5 4.75C4.911 4.75 4.75 4.911 4.75 5.5V8.5C4.75 9.089 4.911 9.25 5.5 9.25H18.5C19.089 9.25 19.25 9.089 19.25 8.5V5.5C19.25 4.911 19.089 4.75 18.5 4.75H5.5ZM18.5 20.75H5.5C4.091 20.75 3.25 19.909 3.25 18.5V15.5C3.25 14.091 4.091 13.25 5.5 13.25H18.5C19.909 13.25 20.75 14.091 20.75 15.5V18.5C20.75 19.909 19.909 20.75 18.5 20.75ZM5.5 14.75C4.911 14.75 4.75 14.911 4.75 15.5V18.5C4.75 19.089 4.911 19.25 5.5 19.25H18.5C19.089 19.25 19.25 19.089 19.25 18.5V15.5C19.25 14.911 19.089 14.75 18.5 14.75H5.5Z" />
        </svg>
      </button>
    </div>
  );
};

export default ViewButtons;
