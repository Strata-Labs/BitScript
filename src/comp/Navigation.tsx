import React, { useState } from 'react';
import Menu from './MenuItems';


const Navigation: React.FC = () => {
  
  return (
    <nav className="h-screen flex flex-col w-[240px] bg-[#0C071D]">
      <div className="flex flex-col">
        <img
          className="h-[37.09px] w-[129.19px] mt-[30px] ml-[21.9px]"
          src="./logo.svg"
          alt="Logo"
        />
      </div>
      <div className="flex flex-col mt-14">
        <Menu />
        
      </div>
    </nav>
  );
};

export default Navigation;
