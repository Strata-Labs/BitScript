import React from 'react';
import Navigation from './Navigation';
import ContentContainer from './ContentContainer';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
        <div className='absolute'>
        <Navigation />
        </div>
      <div className="w-full bg-gray-100">
        <ContentContainer />
      </div>
    </div>
  );
};

export default Layout;
