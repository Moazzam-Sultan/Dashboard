import React, { useState } from 'react';
import { FaBars, FaSearch, FaBell, FaMoon, FaSun, FaAngleDown } from 'react-icons/fa';

// Accept props for mobile sidebar toggling
const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggles the class on the HTML tag
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
        
        {/* Left Side: Mobile Menu Button & Search */}
        <div className="flex items-center gap-4 sm:gap-4">
          
          {/* Mobile Hamburger Button (Restored Logic) */}
          <button 
  onClick={(e) => {
    e.stopPropagation();
    setSidebarOpen(!sidebarOpen);
  }}
  // CHANGE: Removed 'lg:hidden'. Now it shows on all screens.
  className="block border p-1.5 rounded bg-white dark:bg-gray-700 dark:text-white hover:text-blue-600 focus:outline-none mr-4"
>
  <FaBars className="h-5 w-5" />
</button>

          {/* Search Input (Fixed: Removed Duplicate) */}
          <div className="hidden sm:block">
            <div className="relative">
              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                <FaSearch />
              </button>
              
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-10 pr-4 py-2 text-sm font-medium focus:outline-none xl:w-96 text-gray-600 dark:text-gray-300 placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Icons & Profile */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-4">
            
            {/* Dark Mode Toggle */}
            <li>
              <button 
                onClick={toggleDarkMode} 
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:text-blue-600 hover:bg-gray-100 transition dark:bg-gray-700 dark:border-gray-600"
              >
                {isDarkMode ? (
                  <FaSun className="h-4 w-4 text-gray-600 dark:text-yellow-400" />
                ) : (
                  <FaMoon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </li>

            {/* Notification Bell */}
            <li>
              <button className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:text-blue-600 hover:bg-gray-100 transition dark:bg-gray-700 dark:border-gray-600">
                <span className="absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                <FaBell className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </li>
          </ul>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {/* User Profile Area */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="hidden text-right lg:block">
              <span className="block text-sm font-semibold text-black dark:text-white">Moazzam Sultan</span>
              <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Web Developer</span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-600">
                <img 
                  src="/profile.jpg" 
                  alt="Moazzam Sultan" 
                  className="h-full w-full object-cover" 
                  onError={(e) => {e.target.src="https://via.placeholder.com/150"}} 
                />
              </div>
              <FaAngleDown className="hidden sm:block h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;