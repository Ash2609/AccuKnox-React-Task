import { useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";
import AddWidget from "./AddWidget";
import CategoryManager from "./categoryManager";

export default function Dashboard() {
  const categories = useSelector((state) => state.dashboard.categories);

  // State for side panels
  const [openAddWidget, setOpenAddWidget] = useState(false);
  const [openCategoryManager, setOpenCategoryManager] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for dropdown
  const [selectedRange, setSelectedRange] = useState("Last 2 days");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="text-sm text-gray-500">
          Home{" "}
          <span className="text-blue-900 font-medium">&gt; Dashboard V2</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:flex-none md:w-64">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full bg-white shadow hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Profile */}
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
            A
          </div>
        </div>
      </div>

      
      
      <div className="flex flex-wrap justify-start md:justify-end items-center gap-3 mb-6">
        {/* Add Widget */}
        
        <button
          onClick={() => setOpenAddWidget(true)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm font-medium hover:bg-gray-50"
        >
          Add Widget
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Add Category */}
        <button
          onClick={() => setOpenCategoryManager(true)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm font-medium hover:bg-gray-50"
        >
          Manage Categories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Refresh Icon */}
        <button className="p-2 rounded-lg bg-white shadow-sm border border-gray-300 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582M20 20v-5h-.581M5 9a9 9 0 0114-3M19 15a9 9 0 01-14 3"
            />
          </svg>
        </button>

        {/* Menu Icon  */}
        <button className="p-2 rounded-lg border border-gray-300 bg-white/70 hover:bg-gray-100/80">
          <span className="flex flex-col justify-center items-center space-y-1">
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          </span>
        </button>

        {/* Last Days Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm font-medium hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-indigo-900 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {selectedRange}
            <svg
              className="w-4 h-4 ml-2 text-indigo-900"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              {["Last 2 days", "Last 7 days", "Last 15 days"].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* CNAPP DASHBOARD NAME */}
      <div className="text-sm text-gray-500">
          
          <span className="text-black-600 font-bold">CNAPP Dashboard</span>
        </div>

      {/* 🔹 Dashboard Categories */}
      {categories.map((category, idx) => (
        <Category
          key={idx}
          category={category}
          setOpenAddWidget={setOpenAddWidget}
          setSelectedCategory={setSelectedCategory}
        />
      ))}

      {/* 🔹 Side Panels */}
      <AddWidget
        open={openAddWidget}
        setOpen={setOpenAddWidget}
        selectedCategory={selectedCategory}
      />
      <CategoryManager open={openCategoryManager} setOpen={setOpenCategoryManager} />
    </div>
  );
}
