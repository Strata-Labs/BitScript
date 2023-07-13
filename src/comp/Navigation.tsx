import React from 'react';


const Navigation: React.FC = () => {
  return (
    <nav className="h-screen w-[240px] bg-[#0C071D]">
      <div className="flex items-center justify-center h-16">
        <img
          className="h-[37.09px] w-[129.19px] mt-[30px] -ml-20"
          src="./logo.svg"
          alt="Logo"
        />
      </div>
      <div className="flex flex-col mt-14">
        <a href="/home" className="text-[#6C5E70] hover:bg-[#141029] flex items-center py-4 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./home.svg"
            alt="Home Icon"
          />
          Home
        </a>
        <a href="/sandbox" className="text-[#6C5E70] hover:bg-[#141029] flex items-center py-4 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./chat-code.svg"
            alt="Chat Code Icon"
          />
          SandBox
        </a>
        <a href="/scripts" className="text-[#6C5E70] hover:bg-[#141029] flex items-center py-4 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./laptop-code.svg"
            alt="Laptop Code Icon"
          />
          Scripts
        </a>
        <a href="/opCodes" className="text-[#6C5E70] hover:bg-[#141029] flex items-center py-4 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./hashtag.svg"
            alt="Hashtag Icon"
          />
          Op Codes
        </a>
        <a href="/tools" className="text-[#6C5E70] hover:bg-[#141029] flex items-center py-4 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./puzzle.svg"
            alt="Puzzle Icon"
          />
          Tools
        </a>
        <a href="/tutorials" className="text-[#6C5E70] hover:bg-[#141029] flex items-center py-4 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./play-square.svg"
            alt="Play Square Icon"
          />
          Tutorials
        </a>
        <div className="h-full"></div>
        <a href="#" className="text-[#6C5E70] hover:bg-[#141029] flex items-center absolute bottom-8 py-2 px-[20px] font-extralight text-[14px]">
          <img
            className="h-5 w-5 mr-2"
            src="./home.svg"
            alt="Settings Icon"
          />
          Settings
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
