import React from 'react';
import NavBar from './NavBar';
import ProgressTracker from './ProgressTracker';

const Progress = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <NavBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Your Fitness Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Track your progress, celebrate your achievements, and reach new heights! 🚀
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 w-24 rounded-full"></div>
          </div>
        </div>
        <ProgressTracker />
      </div>
    </div>
  );
};

export default Progress;