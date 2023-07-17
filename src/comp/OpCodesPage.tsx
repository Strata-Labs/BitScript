import React from 'react';

import OpCodesViews from './OpCodesViews';

const ScriptsPage: React.FC = () => {
    return (
      <div className="h-screen overflow-auto w-screen">
        <div className="w-full bg-[#F8F8F8]">
          <OpCodesViews />
        </div>
  
      </div>
    );
  };

export default ScriptsPage;