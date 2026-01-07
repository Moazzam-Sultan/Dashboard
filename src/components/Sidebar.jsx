import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  User,
  Table,
  FileText,
  PieChart,
  Box,
  ChevronDown,
  X 
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  // New State for Hover Effect
  const [isHovered, setIsHovered] = useState(false);

  const [openMenus, setOpenMenus] = useState({
    dashboard: true,
    forms: false,
    tables: false,
    pages: false,
    charts: false,
    uiElements: false,
    authentication: false,
  });

  // Logic: Sidebar is expanded if Button is Clicked OR Mouse is Hovering
  const isExpanded = sidebarOpen || isHovered;

  const toggleMenu = (menu) => {
    if (isExpanded) {
      setOpenMenus({ ...openMenus, [menu]: !openMenus[menu] });
    }
  };

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // FIX: Used 'lg:static' to prevent overlapping (it will push content).
      // Logic: Mobile = translate-x. Desktop = Change Width (w-64 vs w-20).
      className={`absolute left-0 top-0 z-40 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-gray-800 dark:border-gray-700 border-r border-gray-200 
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${isExpanded ? 'w-64' : 'w-64 lg:w-20'} 
      lg:static
      `}
    >
      {/* Logo and Title Header */}
      <div className={`flex items-center mt-6 gap-2 py-5.5 lg:py-6.5 ${isExpanded ? 'px-6 justify-between' : 'px-4 justify-center'}`}>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-lg p-2 min-w-[40px] flex justify-center items-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          {/* Hide Text when Mini */}
          <h1 className={`text-2xl font-semibold text-gray-800 dark:text-white whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>
            TailAdmin
          </h1>
        </div>

        {/* Close Button (Mobile Only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="block lg:hidden text-gray-600 dark:text-gray-400 hover:text-blue-600"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* MENU Section */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            {/* Header Styling - Hidden when Mini */}
            <h3 className={`mb-4 ml-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ${isExpanded ? 'block' : 'hidden lg:hidden'}`}>
              Menu
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* === Dashboard (Active Blue Style) === */}
              <li>
                <div
                  className={`group relative flex items-center gap-2.5 rounded-lg py-3 font-medium duration-300 ease-in-out cursor-pointer
                    ${openMenus.dashboard 
                      ? 'bg-blue-600 text-white' // Blue Active State
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}
                    ${isExpanded ? 'px-4 justify-between' : 'justify-center px-2'}
                  `}
                  onClick={() => toggleMenu('dashboard')}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className={`whitespace-nowrap ${isExpanded ? 'block' : 'hidden'}`}>
                      Dashboard
                    </span>
                  </div>
                  {isExpanded && (
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openMenus.dashboard ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
                {/* Submenu */}
                <div className={`overflow-hidden transition-all ${openMenus.dashboard && isExpanded ? 'block' : 'hidden'}`}>
                  <ul className="mt-2 mb-5 flex flex-col gap-2.5 pl-6">
                    <li>
                      <a
                        href="#"
                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 duration-300 ease-in-out hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        eCommerce
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Calendar */}
              <li>
                <a
                  href="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200
                    ${isExpanded ? 'px-4' : 'justify-center px-2'}
                  `}
                >
                  <Calendar className="w-5 h-5" />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>Calendar</span>
                </a>
              </li>

              {/* Profile */}
              <li>
                <a
                  href="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium text-gray-700 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200
                     ${isExpanded ? 'px-4' : 'justify-center px-2'}
                  `}
                >
                  <User className="w-5 h-5" />
                  <span className={`${isExpanded ? 'block' : 'hidden'}`}>Profile</span>
                </a>
              </li>

              {/* Tables */}
              <li>
                <div
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer
                     ${openMenus.tables ? 'bg-gray-100 dark:bg-gray-700' : ''}
                     ${isExpanded ? 'px-4 justify-between' : 'justify-center px-2'}
                  `}
                  onClick={() => toggleMenu('tables')}
                >
                  <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
                    <Table className="w-5 h-5" />
                    <span className={`${isExpanded ? 'block' : 'hidden'}`}>Tables</span>
                  </div>
                  {isExpanded && <ChevronDown className={`w-5 h-5 text-gray-700 dark:text-gray-200 transition-transform ${openMenus.tables ? 'rotate-180' : ''}`} />}
                </div>
              </li>
              
              {/* Pages */}
              <li>
                <div
                   className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer 
                    ${openMenus.pages ? 'bg-gray-100 dark:bg-gray-700' : ''}
                    ${isExpanded ? 'px-4 justify-between' : 'justify-center px-2'}
                   `}
                  onClick={() => toggleMenu('pages')}
                >
                  <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
                    <FileText className="w-5 h-5" />
                    <span className={`${isExpanded ? 'block' : 'hidden'}`}>Pages</span>
                  </div>
                   {isExpanded && <ChevronDown className={`w-5 h-5 text-gray-700 dark:text-gray-200 transition-transform ${openMenus.pages ? 'rotate-180' : ''}`} />}
                </div>
              </li>
            </ul>
          </div>

          {/* OTHERS GROUP */}
          <div>
            <h3 className={`mb-4 ml-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mt-4 ${isExpanded ? 'block' : 'hidden lg:hidden'}`}>
              Others
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Charts */}
               <li>
                <div
                   className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer 
                    ${openMenus.charts ? 'bg-gray-100 dark:bg-gray-700' : ''}
                    ${isExpanded ? 'px-4 justify-between' : 'justify-center px-2'}
                   `}
                  onClick={() => toggleMenu('charts')}
                >
                  <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
                    <PieChart className="w-5 h-5" />
                    <span className={`${isExpanded ? 'block' : 'hidden'}`}>Charts</span>
                  </div>
                   {isExpanded && <ChevronDown className={`w-5 h-5 text-gray-700 dark:text-gray-200 transition-transform ${openMenus.charts ? 'rotate-180' : ''}`} />}
                </div>
              </li>

              {/* UI Elements */}
               <li>
                <div
                   className={`group relative flex items-center gap-2.5 rounded-sm py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer 
                    ${openMenus.uiElements ? 'bg-gray-100 dark:bg-gray-700' : ''}
                    ${isExpanded ? 'px-4 justify-between' : 'justify-center px-2'}
                   `}
                  onClick={() => toggleMenu('uiElements')}
                >
                   <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
                    <Box className="w-5 h-5" />
                    <span className={`${isExpanded ? 'block' : 'hidden'}`}>UI Elements</span>
                  </div>
                   {isExpanded && <ChevronDown className={`w-5 h-5 text-gray-700 dark:text-gray-200 transition-transform ${openMenus.uiElements ? 'rotate-180' : ''}`} />}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
