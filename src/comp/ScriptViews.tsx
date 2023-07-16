import React, { useState, useEffect } from 'react';
import TopSearchBar from './TopSearchBar';
import ViewButtons from './ViewButtons';
import ScriptViewGrid from './ScriptViewGrid';
import ScriptViewList from './ScriptViewList';

const ScriptViews: React.FC = () => {
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
    viewComponent = <ScriptViewGrid />;
  } else {
    if (activeView === 'grid') {
      viewComponent = <ScriptViewGrid />;
    } else if (activeView === 'list') {
      viewComponent = <ScriptViewList />;
    }
  }

  return (
    <div className="h-screen overflow-auto w-screen">
      <div className="w-screen flex flex-col">
        <p className="text-[14px] font-extralight mt-24 md:mt-10 ml-9 md:ml-[270px] text-[#6C5E70]">Scripts</p>
        <div className='flex flex-wrap'>
          <div className='flex w-screen justify-between'>
            <div className='flex'>
              <p className="mt-6 md:mt-6 ml-9 md:ml-[270px] text-[20px] md:text-[18px] lg:text-[28px] text-[#0C071D] font-semibold">Select A Bitcoin Script</p>
              {!isSmallScreen && (
                <p className="md:mt-6 ml-1 lg:text-[28px] md:text-[18px] text-[#0C071D] font-semibold md:block hidden">Format To Explore</p>
              )}
            </div>
            {!isSmallScreen && (
              <ViewButtons buttonOneClick={handleButtonOneClick} buttonTwoClick={handleButtonTwoClick} />
            )}
          </div>
        </div>
        {viewComponent}
      </div>
    </div>
  );
};

export default ScriptViews;
