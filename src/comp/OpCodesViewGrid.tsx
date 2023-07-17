import React from 'react';
import ScriptContainer from './ScriptContainer';
import OpCodeContainer from './OpCodeContainer';

const ScriptViewGrid = () => {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap md:ml-[230px]'>
      <div className='mt-5 md:w-11/12 lg:w-1/2 xl:w-2/6 2xl:w-1/4'>
        <OpCodeContainer
          opCodeName="OP_Equal"
          opCodeCompleteName=''
          opCodeDescription='OP_Equal'
          summary='Returns 1 if the inputs are exactly equal, 0 otherwise.'
          introduction=''
          input=''
          output=''
          category='Constant'
          type='Pop & Push'
          linkPath=''
        />
      </div>
    </div>
  );
};

export default ScriptViewGrid;
