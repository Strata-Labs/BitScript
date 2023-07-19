import React, { useState, useEffect } from 'react';
import ViewButtons from '.././ViewButtons';
import OpCodesViewGrid from './OpCodesViewGrid';
import OpCodesViewList from './OpCodesViewList';
import TopSearchBar from '../TopSearchBar';

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
    if (activeView === 'grid') {
      viewComponent = <OpCodesViewGrid />;
    } else if (activeView === 'list') {
      viewComponent = <OpCodesViewList />;
    }
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
        <div className='flex flex-col ml-20 mr-[20px] md:ml-[270px] md:mr-0'>
            <p className="text-[14px] font-extralight mt-24 md:mt-10 text-[#6C5E70]">Op Codes</p>
            <div className='flex mt-6'>
              <p className="md:ml-0 text-[20px] md:text-[18px] text-[#0C071D] font-semibold mr-[50px]">OP Codes Are The Building Blocks Of Script</p>
              <div className='flex md:hidden mt-7'>
                <ViewButtons buttonOneClick={handleButtonOneClick} buttonTwoClick={handleButtonTwoClick} />
              </div>
            </div>
          <p className="mt-6 md:mr-[170px] md:text-[16px] text-[#6C5E70] font-light md:flex mr-14 text-[14px]">
            Short for operation codes, these are the building blocks of Bitcoin Script, the scripting language used in the Bitcoin protocol. Each op_code represents a specific operation/function/command that manipulates or reads data within a Bitcoin Script. <span className="text-[#F79327] md:hidden">Explore a few below!</span>
          </p>
          <span className="text-[#F79327] hidden font-light md:flex md:text-[16px]">Explore a few below!</span>
          <div className='md:flex justify-end hidden'>
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
