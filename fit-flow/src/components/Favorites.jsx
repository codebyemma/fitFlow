import useExerciseStore from "../stores/exerciseStore";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favoriteIds = useExerciseStore((s) => s.favoriteIds);
  const exercises = useExerciseStore((s) => s.exercises);

  const favoriteExercises = (exercises || []).filter((ex) =>
    favoriteIds.includes(ex.id)
  );

  const defaultImg =
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Favorite Exercises</h2>

        {favoriteExercises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteExercises.map((ex) => {
              const translation = ex.translations?.find((t) => t.language === 2);
              const name = ex.name || translation?.name || "Unnamed Exercise";
              const img = ex.images?.[0]?.image || ex.gifUrl || defaultImg;
              const equipment = Array.isArray(ex.equipment) && ex.equipment.length > 0
                ? ex.equipment.map((e) => e.name).join(", ")
                : (ex.equipment && typeof ex.equipment === 'string' ? ex.equipment : 'Bodyweight');
              const category = ex.category?.name || ex.bodyPart || "Uncategorized";

              return (
                <div key={ex.id} className="bg-white rounded-lg shadow overflow-hidden border">
                  <Link to={`/exercise/${ex.id}`} className="block hover:opacity-90">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-40 object-cover"
                      onError={(e) => (e.target.src = defaultImg)}
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category}</p>
                      <p className="text-xs text-gray-500 mt-2">Equipment: {equipment}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">No favorite exercises found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;