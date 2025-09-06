import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">FitFlow</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors duration-200">Exercises</Link>
            <Link to="/favorites" className="hover:text-blue-600 transition-colors duration-200">Favorites</Link>
            <Link to="/history" className="hover:text-blue-600 transition-colors duration-200">History</Link>
            <Link to="/progress" className="hover:text-blue-600 transition-colors duration-200">Progress</Link>
            <Link to="/plans" className="hover:text-blue-600 transition-colors duration-200">Plans</Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden ${open ? 'block' : 'hidden'} border-t border-gray-100 bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link onClick={() => setOpen(false)} to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Exercises</Link>
          <Link onClick={() => setOpen(false)} to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Favorites</Link>
          <Link onClick={() => setOpen(false)} to="/history" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">History</Link>
          <Link onClick={() => setOpen(false)} to="/progress" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Progress</Link>
          <Link onClick={() => setOpen(false)} to="/plans" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Plans</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

