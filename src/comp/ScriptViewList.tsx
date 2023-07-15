import React from 'react';

const scriptDescription = [
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  { name: 'P2PK (pay to public key)', summary: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', introduced: 'BIP133', inUse: 'Yes', numOfOPs: '14', link: '' },
  
];

const ScriptViewList = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 ml-[240px]">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 bg-white rounded-lg overflow-hidden shadow">
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
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}>
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
                      <a href={script.link} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#F79327]"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 4l15 8-15 8V4z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptViewList;
