import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import RoutineBuilder from "./RoutineBuilder";
import WorkoutTracker from "./WorkoutTracker";
import ProgressionChart from "./ProgressionChart";
import NavBar from "./NavBar";
import { ExerciseCard } from "./jagon";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { exercises, fetchExercises, loading, error } = useExerciseStore();
  
  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercises();
    }
  }, [exercises.length, fetchExercises]);

  const exercise = exercises.find((ex) => String(ex.id) === String(id));

  if (loading && exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NavBar />
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading exercises: {error}</p>
          <button 
            onClick={() => fetchExercises()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Retry
          </button>
          <button 
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NavBar />
        <div className="text-center">
          <p className="text-gray-600 mb-4">Exercise not found.</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <button 
          onClick={() => navigate("/dashboard")}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          ← Back to Dashboard
        </button>

        <ExerciseCard exercise={exercise} />
      </div>
    </div>
  );
};

export default DetailsPage;
