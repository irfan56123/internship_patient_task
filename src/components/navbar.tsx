'use client';
import { useState } from 'react';
import { Bell } from 'lucide-react'; // notification icon

export default function Navbar() {
  const [location] = useState('Delhi');

  return (
    <nav className="w-full px-4 md:px-8 py-4 bg-white flex flex-col md:flex-row justify-between items-center gap-4 border-b shadow-sm">
      
      {/* Left Section - User Info + Bell (Mobile) */}
      <div className="flex items-center gap-3">
        {/* User Image */}
        <img
          src="/images/user.jpg"
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Greeting and Location */}
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Hello, Priya</span>
          <span className="text-sm text-gray-500">{location}</span>
        </div>

        {/* Bell Icon (Mobile only) */}
        <div className="ml-2 cursor-pointer p-2 hover:bg-gray-100 rounded-full md:hidden">
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </div>
     
      {/* Middle Section - Search Box */}
      <div className="w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Search doctors, specialties..."
          className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Bell Icon (Desktop only) */}
      <div className="hidden md:block cursor-pointer p-2 hover:bg-gray-100 rounded-full">
        <Bell className="w-6 h-6 text-gray-600" />
      </div>
    </nav>
  );
}

