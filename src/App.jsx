import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    // CHANGE IS HERE: Added 'dark:bg-gray-900 dark:text-white'
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Sidebar - Pass props for mobile toggle */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        {/* Navbar - Pass props to control sidebar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<DashboardHome />} />
              <Route path="/profile" element={<h2>Profile Page</h2>} />
              <Route path="/settings" element={<h2>Settings Page</h2>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

// Temporary Dashboard Component (Cards bhi Dark honi chahiyen)
const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">Total Views</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">$45,231</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">Total Profit</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">$12,040</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">New Users</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">3,456</p>
        </div>
      </div>
    </div>
  );
};

export default App;