import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

// IMPORT PATHS CHECK KAREIN:
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
// Note: File ka naam 'Dashboard' hai, isliye import path './components/Dashboard' hoga
import DashboardHome from "./components/Dashboard"; 

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        {/* Navbar Component */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="relative z-10 w-full h-full">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Routes>
              {/* Dashboard Route */}
              <Route path="/" element={<DashboardHome />} />
              
              {/* Dummy Routes for testing */}
              <Route path="/profile" element={<h2>Profile Page</h2>} />
              <Route path="/settings" element={<h2>Settings Page</h2>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;