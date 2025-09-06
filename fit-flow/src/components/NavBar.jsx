import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">FitFlow</h1>

          {/* Links */}
          <div className="flex gap-6 text-gray-700 font-medium">
            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Exercises
            </Link>
            <Link
              to="/favorites"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Favorites
            </Link>
            <Link
              to="/history"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              History
            </Link>
            <Link
              to="/progress"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Progress
            </Link>
            <Link
              to="/plans"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Plans
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

