import React from 'react';

const ContentContainer: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <p className="text-[14px] font-extralight absolute top-0 left-0 mt-24 ml-9 text-[#6C5E70]">Scripts</p>
      <p className="mt-36 ml-9 text-[20px] text-[#0C071D] font-semibold">Select A Bitcoin Script</p>
      <p className="ml-9 text-[20px] text-[#0C071D] font-semibold">Format To Explore</p>
      <div className="bg-white h-[226px] mx-auto mt-5 w-[353px] p-4">
        <div>
          <p className="text-[#68757E] font-extralight">Script Name</p>
        </div>
        <div>
          <p className="text-[#111827] font-semibold">P2PK <span className='font-light'>(pay to public key)</span></p>
          <p className="text-[#68757E] font-extralight mt-4">Summary</p>
          <p className='text-[#111827] text-[14px]'>The most basic script for a direct transfer.</p>
          <p className='text-[#111827] text-[14px]'>Rarely used, but good starting point.</p>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[#68757E] font-extralight">Introduced</p>
            <p className="text-[#111827] font-extralight">BIP133</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight">In Use?</p>
            <p className="text-[#111827] font-extralight">Yes</p>
          </div>
          <div>
            <p className="text-[#68757E] font-extralight"># of OPs</p>
            <p className="text-[#111827] font-extralight">14</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ContentContainer;
