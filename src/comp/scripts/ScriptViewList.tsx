import Link from 'next/link';
import React from 'react';
import ScriptBlockListContainer from './ScriptsBlockList';

const scriptDescription = [
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '/p2pkh' },

];

const ScriptViewList = () => {
  return (
    <div>
    <div className="px-4 sm:px-6 lg:px-8 ml-[240px] md:flex hidden">
      <div className="mt-8 bg-white rounded-lg overflow-hidden mb-10 w-screen min-w-[1140px]">
        <div className="px-4 py-2">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '50%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3">
                    ScriptName
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    Summary
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    Introduced
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    InUse?
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    #ofOPs
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]"></th>
                </tr>
              </thead>
              <tbody>
                {scriptDescription.map((script, index) => (
                  <tr key={index} className={`hover-row ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                    <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D] sm:pl-3">
                      {script.name}
                    </td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">{script.summary}</td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">{script.introduced}</td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                      {script.inUse ? 'Yes' : 'No'}
                    </td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">{script.numOfOPs}</td>
                    <td className="px-3 py-4 text-sm text-[#0C071D]">
                      <Link href={script.link} className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99978 19.7498C8.80778 19.7498 8.61575 19.6768 8.46975 19.5298C8.17675 19.2368 8.17675 18.7618 8.46975 18.4688L14.9397 11.9988L8.46975 5.52883C8.17675 5.23583 8.17675 4.7608 8.46975 4.4678C8.76275 4.1748 9.23779 4.1748 9.53079 4.4678L16.5308 11.4678C16.8238 11.7608 16.8238 12.2358 16.5308 12.5288L9.53079 19.5288C9.38379 19.6768 9.19178 19.7498 8.99978 19.7498Z" fill="#F79327"/>
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className='flex flex-col items-center justify-center md:hidden mb-5 mt-5'>
      <div>
      <ScriptBlockListContainer scriptNameTitle={'Script Name'} scriptCompleteName={'(pay to public key)'} scriptShortName={'P2PK'} summary={'The most basic script for a direct transfer. Rarely used, but a good starting point.'} introduced={'BIP133'} inUse={'Yes'} numberOfOPs={'14'} linkPath={'/p2pkh'}/>
      </div>
      <div>
      <ScriptBlockListContainer scriptNameTitle={'Script Name'} scriptCompleteName={'(pay to public key)'} scriptShortName={'P2PK'} summary={'The most basic script for a direct transfer. Rarely used, but a good starting point.'} introduced={'BIP133'} inUse={'Yes'} numberOfOPs={'14'} linkPath={''}/>
      </div>
      <div>
      <ScriptBlockListContainer scriptNameTitle={'Script Name'} scriptCompleteName={'(pay to public key)'} scriptShortName={'P2PK'} summary={'The most basic script for a direct transfer. Rarely used, but a good starting point.'} introduced={'BIP133'} inUse={'Yes'} numberOfOPs={'14'} linkPath={''}/>
      </div>
      <div>
      <ScriptBlockListContainer scriptNameTitle={'Script Name'} scriptCompleteName={'(pay to public key)'} scriptShortName={'P2PK'} summary={'The most basic script for a direct transfer. Rarely used, but a good starting point.'} introduced={'BIP133'} inUse={'Yes'} numberOfOPs={'14'} linkPath={''}/>
      </div>
      
    </div>
    </div>

  );
};

export default ScriptViewList;
