import React from 'react';
import Navigation from './Navigation';
import NavigationMobile from './NavigationMobile';
import ScriptViews from './ScriptViews';

const Layout = () => {

  return (
    <div className="h-screen w-screen">

      {/* Show mobile nav on small screens */}
      <div className="absolute md:hidden">
        <NavigationMobile /> 
      </div>

      {/* Show regular nav on medium screens and up */}
      <div className="hidden md:block absolute">
        <Navigation />
      </div>

      <div className="w-full bg-[#F8F8F8]">
        <ScriptViews />
      </div>

    </div>
  );
};

export default Layout;