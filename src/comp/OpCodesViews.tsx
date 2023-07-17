import React, { useState, useEffect } from 'react';
import ViewButtons from './ViewButtons';
import OpCodesViewGrid from './OpCodesViewGrid';
import OpCodesViewList from './OpCodesViewList';

const OpCodesViews: React.FC = () => {
  const [activeView, setActiveView] = useState('grid');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleButtonOneClick = () => {
    setActiveView('grid');
  };

  const handleButtonTwoClick = () => {
    setActiveView('list');
  };

  let viewComponent;

  if (isSmallScreen) {
    viewComponent = <OpCodesViewGrid />;
  } else {
    if (activeView === 'grid') {
      viewComponent = <OpCodesViewGrid />;
    } else if (activeView === 'list') {
      viewComponent = <OpCodesViewList />;
    }
  }

  return (
    <div className="h-screen overflow-auto w-screen">
      <div className="w-screen h-screen flex flex-col">
        <div className='flex flex-col ml-6 md:ml-[270px]'>
          <p className="text-[14px] font-extralight mt-24 md:mt-10 text-[#6C5E70]">Op Codes</p>
          <p className="mt-6 md:mt-6 text-[20px] md:text-[18px] text-[#0C071D] font-semibold">OP Codes Are The Building Blocks Of Script</p>
          <p className="md:mt-6 md:text-[16px] text-[#6C5E70] font-extralight md:flex hidden">Short for operation codes, these are the building blocks of Bitcoin Script, the scripting language used in the Bitcoin protocol. Each op_code represents a specific operation/function/command that manipulates or reads data within a Bitcoin Script.</p>
          <p className="md:text-[16px] text-[#F79327] font-extralight md:flex hidden">Explore a few below!</p>
          <div className='flex justify-end'>
            <ViewButtons buttonOneClick={handleButtonOneClick} buttonTwoClick={handleButtonTwoClick} />
          </div>
        </div>
        <div className='flex flex-wrap'>
        </div>
        {viewComponent}
      </div>
    </div>
  );
};

export default OpCodesViews;
