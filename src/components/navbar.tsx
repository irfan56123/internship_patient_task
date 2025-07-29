'use client';
import { useState } from 'react';

export default function Navbar() {
  const [location, setLocation] = useState('Delhi');

  return (
    <nav className="w-full px-4 md:px-8 py-4 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b shadow-sm">
          {/* User Greeting */}
          <h2 className="font-bold text-xl font">Hello, User</h2>

      {/* Search */}
      <div className="w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Search doctors, specialties..."
          className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </span>
      </div>
    </nav>
  );
}
