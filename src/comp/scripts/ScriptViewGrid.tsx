import React from 'react';
import ScriptContainer from './ScriptContainer';

const ScriptViewGrid = () => {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap md:ml-[230px]'>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer. Rarely used, but a good starting point"
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <ScriptContainer
          scriptName="Script Name"
          scriptCompleteName='(pay to public key)'
          scriptDescription="P2PK"
          summary="The most basic script for a direct transfer."
          introduction="BIP133"
          inUse="Yes"
          numberOfOPs="14"
          linkPath='/p2pkh'
        />
      </div>
    </div>
  );
};

export default ScriptViewGrid;
