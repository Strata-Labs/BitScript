import React, { useState } from 'react';
import Menu from './MenuItems';

const NavigationMobile: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleSearchClick = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchText('');
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={`relative h-screen w-screen ${isMenuOpen ? 'overflow-hidden' : ''}`}>
      <div
        className={`flex justify-between py-4 px-8 w-screen h-72px ${
          isMenuOpen ? 'fixed h-screen w-screen top-0 left-0 right-0 bg-[#0C071D]' : 'bg-[#0C071D]'
        }`}
      >
        {isMenuOpen ? (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-between">
              {/* Menu title */}
              <h1 className="text-white font-extralight mr-2">Menu</h1>

              {/* Close button */}
              <button className="text-white focus:outline-none" onClick={handleMenuClick}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Hamburger menu button */}
            <button
              className="text-[#FFFFFF] focus:outline-none"
              onClick={handleMenuClick}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Centered logo */}
            <div className="flex flex-col -mt-8 mr-4">
              <img
                className="h-[37.09px] w-[129.19px] mt-[30px] ml-[21.9px]"
                src="./logo.svg"
                alt="Logo"
              />
            </div>

            {/* Magnifying glass search icon */}
            {!isSearchOpen && (
              <button
                className="text-[#FFFFFF] focus:outline-none"
                onClick={handleSearchClick}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.873-4.873"
                  />
                  <circle cx="10" cy="10" r="7" />
                </svg>
              </button>
            )}

            {/* Search input */}
            {isSearchOpen && (
              <div className="relative flex">
                <input
                  type="text"
                  className="py-2 px-4 bg-transparent text-white border-b rounded-full border-white border-opacity-10 focus:outline-none"
                  placeholder="Type in a script or op_code"
                  value={searchText}
                  onChange={handleSearchInputChange}
                />
                <button
                  className="text-white focus:outline-none"
                  onClick={handleSearchClose}
                >
                  <svg
                    className="w-[24px] h-[24px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {isMenuOpen && (
        <div className="flex flex-col justify-between bg-[#0C071D] h-full mt-20 ml-3">
          {/* Menu content */}
          <Menu />
        </div>
      )}
    </div>
  );
};

export default NavigationMobile;
