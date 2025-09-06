import NavBar from "./NavBar";
import ExerciseLists from "./ExerciseLists";
import useExerciseStore from "../stores/exerciseStore";
import { useEffect } from "react";
import Footer from "./Footer";

const Dashboard = () => {
  const { exercises, fetchExercises, loading, error, favoriteIds } = useExerciseStore();

  // Fetch data on mount
  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercises();
    }
  }, [exercises.length, fetchExercises]);

  const favoriteExercises = (exercises || []).filter((ex) => favoriteIds.includes(ex.id));

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
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading exercises: {error}</p>
          <button 
            onClick={() => fetchExercises()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <hr className="my-4" />

      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold">Welcome back to FitFlow</h2>
        <p className="text-gray-600">Ready to crush your fitness goals today?</p>

        <h2 className="text-xl font-semibold mt-6">Quick Start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold">Quick Workout</h3>
            <p>15-min full body</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-bold">Morning Stretch</h3>
            <p>Gentle Wake-up routine</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold">Strength Builder</h3>
            <p>Build muscle today</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Favorites</h2>
          {favoriteExercises.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {favoriteExercises.slice(0, 6).map((exercise) => {
                    const translation = exercise.translations?.find((t) => t.language === 2);
                    const name = exercise.name || translation?.name || "Unnamed Exercise";
                    const defaultImg = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop";
                    const img = exercise.images?.[0]?.image || exercise.gifUrl || defaultImg;
                    const equipment = Array.isArray(exercise.equipment) && exercise.equipment.length > 0
                      ? exercise.equipment.map((e) => e.name).join(", ")
                      : (exercise.equipment && typeof exercise.equipment === 'string' ? exercise.equipment : 'Bodyweight');
                    const category = exercise.category?.name || exercise.bodyPart || "Uncategorized";

                    return (
                    <a href={`/exercise/${exercise.id}`} key={exercise.id} className="block border rounded-lg overflow-hidden hover:shadow-md">
                      <img
                        src={img}
                        alt={name}
                        className="w-full h-48 object-cover"
                        onError={(e) => { e.target.src = defaultImg; }}
                      />
                      <div className="p-2">
                        <h3 className="font-medium">{name}</h3>
                        <p className="text-sm text-gray-600">{category}</p>
                        <p className="text-xs text-gray-500 mt-1">Equipment: {equipment}</p>
                      </div>
                    </a>
                  );
                  })}
            </div>
          ) : (
            <p className="text-gray-500">No favorites yet.</p>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
          <ExerciseLists />
        </div>
    <Footer />
      </div>
    </div>
  );
};

export default Dashboard;