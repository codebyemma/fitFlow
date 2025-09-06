import React from "react";
import NavBar from "./NavBar";
import ProgressTracker from "./ProgressTracker";

const Progress = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Workout Progress</h1>
        <ProgressTracker />
      </div>
    </div>
  );
};

export default Progress;