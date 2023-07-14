import React from 'react';

import Navigation from './Navigation';
import NavigationMobile from './NavigationMobile';

import ContentContainer from './ContentContainer';

const Layout = () => {

  return (
    <div className="flex h-screen">

      {/* Show mobile nav on small screens */}
      <div className="absolute md:hidden">
        <NavigationMobile /> 
      </div>

      {/* Show regular nav on medium screens and up */}
      <div className="hidden md:block absolute">
        <Navigation />
      </div>

      <div className="w-full bg-[#F8F8F8]">
        <ContentContainer />
      </div>

    </div>
  );

};

export default Layout;