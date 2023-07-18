import React from 'react';
import Link from 'next/link';
import OpCodeVideoContainer from './OpCodeVideoContainer';
import OpCodesUsageList from './OpCodesUsageList';
import OpCodeBlockList from './OpCodeBlockList';

const OpDup: React.FC = () => {
  return (
<div className="h-screen overflow-auto w-screen">
    <div className='w-screen flex flex-col md:flex-row justify-between md:mt-5 mt-[100px] ml-5 md:ml-0'>
        <div className='flex flex-col md:flex-row justify-start md:ml-[260px]'>
            {/* Left pointing icon that returns to /opCodes page */}
            <Link 
            href="/opCodes" 
            className=""
            >
                <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
                rotate="180deg" 
                xmlns="http://www.w3.org/2000/svg"
                className="md:mt-[7px] mt-[17px] md:ml-0 ml-2"
                >
                <g transform="rotate(180 12 12)">
                <path d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z" fill="#F79327"/>
                </g>
                </svg>
            </Link>
            {/* Title and Description */}
            <div className='flex'>
                <p className='text-[#0C071D] font-semibold ml-2 md:ml-4 text-[20px] mt-[17px] md:mt-0 md:text-[28px]'>OP_Dup</p>
                <p className='text-[#687588] ml-[8px] font-extralight text-[12px] mt-[22px] md:text-[18px] md:mt-2'>(118 | 0x76)</p>
            </div>
        </div>
        {/* Top Right Input and Output */}
        <div className='flex md:justify-end mr-6 items-center mt-3'>
            <p className='text-sm text-black'>Input</p>
            <Link href={''} className='text-[#F79327] underline text-sm md:text-md md:mt-0  ml-2'>1 items</Link>
            <p className='text-gray-300 ml-3 mr-4'>|</p>
            <p className='text-sm text-black'>Output</p>
            <Link href={''} className='text-[#F79327] underline text-sm md:text-md md:mt-0 ml-2'>1 items</Link>
        </div>
    </div>
    {/* Summary of Op Dup */}
    <div className='flex flex-col items-start ml-4 mr-4 md:ml-[265px] md:mr-[200px] mt-7'>
        <p className='text-[#6C5E70] text-[16px] font-extralight'>OP_DUP is a common stack operation used to duplicate the top item of the stack. Dup, short for duplicate, is usually used when we need to do something more than once (usually verify), with a specific existing item in the stack. In P2PKH, for example, it’s used to duplicate a public key which is used twice: once in an OP_EQUALVERIFY & again in OP_CHECKSIG.</p>
    </div>
    {/* Bottom part of Op_Dup */}
    <div className='flex justify-center md:justify-start'>
        <OpCodeVideoContainer />
    </div>
    {/* Usage List Hidden on Small screens */}
    <div className='md:flex items-center justify-center hidden'>
        <OpCodesUsageList/>
    </div>
    {/* Usage blocks hidden on medium screens */}
    <div className='flex justify-center md:hidden mb-7'>
        <OpCodeBlockList usedIn={'P2PKH (pay to public key hash)'} description={'The most basic script for a direct transfer. Rarely used, but a good starting point.'} timesUsed={'0x38ADD1aD...'} example={'12'} linkPath={''}/>
    </div>
</div>
  );
};

export default OpDup;
