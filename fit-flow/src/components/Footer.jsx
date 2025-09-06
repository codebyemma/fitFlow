import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold">FitFlow</h3>
          <p className="text-sm text-gray-400">Track workouts, build routines, progress consistently.</p>
        </div>

        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          <Link to="/favorites" className="text-sm hover:underline">Favorites</Link>
          <Link to="/routine-builder" className="text-sm hover:underline">Routine Builder</Link>
          <Link to="/workout-tracker" className="text-sm hover:underline">Workout Tracker</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">GitHub</a>
        </nav>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} FitFlow. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Built with React + Vite</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
