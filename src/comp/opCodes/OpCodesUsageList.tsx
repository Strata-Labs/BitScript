import Link from 'next/link';
import React from 'react';

// Content on each row
const scriptDescription = [
  { Op_Code: 'P2PKH (pay to public key hash)', Description: 'The most basic script for a direct transfer. Rarely used, but a good starting point.', Input: '0x38ADD1aD...', Output: '14', link: '/p2pkh' },
  { Op_Code: 'P2SH (pay to script hash)', Description: 'Allows for more complex spending conditions by locking funds to a specific script', Input: '0x38ADD1aD...', Output: '10', link: '' },
  { Op_Code: 'P2WPKH (pay to witness public key hash)', Description: 'Introduced with Segregated Witness (SegWit) that provides enhanced transaction capacity and security', Input: '0x38ADD1aD...', Output: '8', link: '' },
  { Op_Code: 'P2WSH (pay to witness script hash)', Description: 'Similar to P2SH, but compatible with SegWit', Input: '0x38ADD1aD...', Output: '7', link: '' },
  // We can add more rows here
];

const OpCodesUsageList = () => {
  return (
    // Usage list for op codes, this is displayed when we click on an op code on the page of its description
<div className="px-4 sm:px-6 lg:px-8 ml-[240px] md:block hidden w-screen">
      <div className="mt-8 bg-white rounded-lg  mb-10 min-w-[1150px]">
        <div className="px-4 py-2">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              {/* Column size */}
              <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '50%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              {/* Titles */}
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-light text-[#687588] sm:pl-3">
                    Used In
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    Times Used
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                    Live Example
                  </th>
                  {/* Space for the icon link */}
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-light text-[#687588]">
                  </th>
                </tr>
              </thead>
              {/* Content of each row */}
              <tbody>
                {scriptDescription.map((script, index) => (
                  <tr key={index} className={`hover-row ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                    <td className="py-4 pl-4 pr-3 text-sm text-[#0C071D] sm:pl-3">
                      {script.Op_Code}
                    </td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">{script.Description}</td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">{script.Input}</td>
                    <td className="px-3 py-4 text-sm font-light text-[#0C071D]">
                      {script.Output}
                    </td>
                    <td className="px-3 py-4 text-sm text-[#0C071D]">
                      {/* Link on each of the rows */}
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
  );
};

export default OpCodesUsageList;
