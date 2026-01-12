import React, { useState } from 'react';
import { Users, Package, MoreVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';

// --- DATASETS (Monthly, Quarterly, Annually) ---

const monthlyData = [
  { name: 'Jan', sales: 180, revenue: 40 }, { name: 'Feb', sales: 190, revenue: 30 },
  { name: 'Mar', sales: 170, revenue: 50 }, { name: 'Apr', sales: 160, revenue: 40 },
  { name: 'May', sales: 175, revenue: 55 }, { name: 'Jun', sales: 165, revenue: 40 },
  { name: 'Jul', sales: 170, revenue: 70 }, { name: 'Aug', sales: 200, revenue: 100 },
  { name: 'Sep', sales: 220, revenue: 110 }, { name: 'Oct', sales: 210, revenue: 120 },
  { name: 'Nov', sales: 240, revenue: 150 }, { name: 'Dec', sales: 235, revenue: 140 },
];

const quarterlyData = [
  { name: 'Q1', sales: 450, revenue: 120 },
  { name: 'Q2', sales: 500, revenue: 150 },
  { name: 'Q3', sales: 600, revenue: 280 },
  { name: 'Q4', sales: 700, revenue: 400 },
];

const annualData = [
  { name: '2021', sales: 2000, revenue: 500 },
  { name: '2022', sales: 2500, revenue: 800 },
  { name: '2023', sales: 2300, revenue: 900 },
  { name: '2024', sales: 3000, revenue: 1200 },
  { name: '2025', sales: 3500, revenue: 1500 },
];

// --- Data for Top Bar Chart (Sales) ---
const barChartData = [
  { name: 'Jan', sales: 150 }, { name: 'Feb', sales: 380 }, { name: 'Mar', sales: 190 },
  { name: 'Apr', sales: 290 }, { name: 'May', sales: 180 }, { name: 'Jun', sales: 185 },
  { name: 'Jul', sales: 280 }, { name: 'Aug', sales: 100 }, { name: 'Sep', sales: 200 },
  { name: 'Oct', sales: 390 }, { name: 'Nov', sales: 270 }, { name: 'Dec', sales: 100 },
];

// --- Radial Progress Component ---
const RadialProgress = ({ percentage }) => {
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * (circumference * 0.75);
  const dashArray = `${circumference * 0.75} ${circumference}`;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[135deg]">
        <circle stroke="#374151" strokeWidth={stroke} strokeLinecap="round" fill="transparent" r={normalizedRadius} cx={radius} cy={radius} style={{ strokeDasharray: dashArray }} />
        <circle stroke="#6366f1" strokeWidth={stroke} strokeLinecap="round" fill="transparent" r={normalizedRadius} cx={radius} cy={radius} style={{ strokeDasharray: dashArray, strokeDashoffset: strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }} />
      </svg>
      <div className="absolute flex flex-col items-center text-gray-800 dark:text-white">
        <span className="text-5xl font-bold">{percentage}%</span>
        <span className="text-sm text-green-500 bg-green-100 dark:bg-green-400/10 px-3 py-1 rounded-full mt-2">+10%</span>
      </div>
    </div>
  );
};

// --- Statistics Chart Component (With Logic) ---
const StatisticsChart = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState('Monthly');

  // Function to get data based on active tab
  const getData = () => {
    switch(activeTab) {
      case 'Monthly': return monthlyData;
      case 'Quarterly': return quarterlyData;
      case 'Annually': return annualData;
      default: return monthlyData;
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 w-full mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Statistics</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Target you have set for each month</p>
        </div>
        
        {/* Dynamic Buttons */}
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
          {['Monthly', 'Quarterly', 'Annually'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm' // Active Style
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white' // Inactive Style
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
            <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6, strokeWidth: 0 }} />
            <Area type="monotone" dataKey="revenue" stroke="#94a3b8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
const DashboardHome = () => {
  return (
    <div className="w-full h-full font-sans text-gray-800 dark:text-white transition-colors duration-300">
      
      {/* Top Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
              <div className="p-3 bg-gray-100 dark:bg-slate-700/50 w-fit rounded-lg mb-4"><Users className="text-gray-500 dark:text-gray-300" size={24} /></div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Customers</h3>
              <div className="flex items-end justify-between mt-2">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">3,782</h2>
                <span className="flex items-center text-green-500 text-xs font-semibold bg-green-100 dark:bg-green-400/10 px-2 py-1 rounded-full"><ArrowUp size={12} className="mr-1" /> 11.01%</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
              <div className="p-3 bg-gray-100 dark:bg-slate-700/50 w-fit rounded-lg mb-4"><Package className="text-gray-500 dark:text-gray-300" size={24} /></div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Orders</h3>
              <div className="flex items-end justify-between mt-2">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">5,359</h2>
                <span className="flex items-center text-red-500 text-xs font-semibold bg-red-100 dark:bg-red-400/10 px-2 py-1 rounded-full"><ArrowDown size={12} className="mr-1" /> 9.05%</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 flex-1">
            <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Sales</h3><MoreVertical className="text-gray-400 cursor-pointer" size={20} /></div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 4, 4]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div><h3 className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Target</h3><p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Target you have set for each month</p></div>
            <MoreVertical className="text-gray-400 cursor-pointer" size={20} />
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <RadialProgress percentage={75.55} />
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6 px-4">You earn $3287 today, it is higher than last month. Keep up your good work!</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="text-center"><p className="text-gray-500 dark:text-gray-400 text-xs">Target</p><p className="text-sm font-bold flex items-center justify-center mt-1 text-gray-800 dark:text-white">$20K <ArrowDown size={12} className="text-red-500 ml-1" /></p></div>
            <div className="text-center"><p className="text-gray-500 dark:text-gray-400 text-xs">Revenue</p><p className="text-sm font-bold flex items-center justify-center mt-1 text-gray-800 dark:text-white">$20K <ArrowUp size={12} className="text-green-500 ml-1" /></p></div>
            <div className="text-center"><p className="text-gray-500 dark:text-gray-400 text-xs">Today</p><p className="text-sm font-bold flex items-center justify-center mt-1 text-gray-800 dark:text-white">$20K <ArrowUp size={12} className="text-green-500 ml-1" /></p></div>
          </div>
        </div>
      </div>

      {/* Statistics Section (Updated with Logic) */}
      <StatisticsChart />

    </div>
  );
};

export default DashboardHome;