import React from 'react';
import ImageScriptComponent from './ImageScriptComponent';
import Link from 'next/link';

interface ScriptContainerProps {
  scriptName: string;
  scriptCompleteName: string;
  scriptDescription: string;
  summary: string;
  introduction: string;
  inUse: string;
  numberOfOPs: string;
  linkPath: string;
}

const ScriptContainer: React.FC<ScriptContainerProps> = ({
  scriptCompleteName,
  scriptDescription,
  summary,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
    <div className="flex justify-center">
      <div className="bg-white mb-5  mx-9 px-5 p-4 rounded-xl w-[353px] h-[321px] md:w-[274px] md:h-[343px] flex flex-col justify-between group hover:-translate-y-1 hover:bg-gradient-to-b from-[#100F20] to-[#321B3A] transition-all ease-in-out duration-500">
        <div>
          <p className="text-[#111827] text-center text-[26px] group-hover:text-white transition-all ease-in-out duration-500">
            {scriptDescription}
          </p>
          <p className="text-[#111827] text-center font-extralight group-hover:text-white transition-all ease-in-out duration-500">{scriptCompleteName}</p>
          <div className="flex justify-center">
            <ImageScriptComponent />
          </div>
          <p className="text-[#68757E] font-extralight mt-4 text-[14px] hidden">Summary</p>
          <p className="text-[#111827] font-light text-[14px] text-center mt-5 group-hover:text-white transition-all ease-in-out duration-500">{summary}</p>
        </div>

      </div>
    </div>
    </Link>
  );
};

export default ScriptContainer;
