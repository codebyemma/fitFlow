import { useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import Search from "./Search";
const Exercise = ({ onSelect }) => {
    const { exercises, fetchExercises, loading, error, searchTerm, selectedCategory } = useExerciseStore();

    useEffect(() => {
        if (exercises.length === 0) {
            fetchExercises();
        }
    }, [exercises.length, fetchExercises]);

    const filtered = exercises.filter((ex) => {
    // Prefer top-level name from API, fall back to translation name, then empty string
    const rawName = ex.name || ex.translations?.find((t) => t.language === 2)?.name || "";
    const exerciseName = String(rawName);
    const matchesSearch = exerciseName
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      ex.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });


    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-600">
                <p>Error loading exercises: {error}</p>
                <button 
                    onClick={() => fetchExercises()}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Select Exercise</h2>
            <Search />
            <div className="max-h-60 overflow-y-auto space-y-2">
                {filtered.map((ex) => {
                    const translation = ex.translations?.find((t) => t.language === 2);
                    const name = translation?.name || "Unnamed Exercise";
                return (
                    <button
                        key={ex.id}
                        onClick={() => onSelect(ex)}
                        className="w-full text-left p-3 border rounded hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-gray-600">{ex.category?.name}</p>
                    </button>
                );
                })}
            </div>
        </div>
    );
};

export default Exercise;
