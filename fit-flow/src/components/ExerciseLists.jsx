// components/ExerciseLists.js
import React, { useState } from "react";
import useExerciseStore from "../stores/exerciseStore";
import { Link } from "react-router-dom";
import Search from "./Search";

const ExerciseLists = () => {
  // Get raw state
  const exercises = useExerciseStore((state) => state.exercises);
  const searchTerm = useExerciseStore((state) => state.searchTerm);
  const selectedCategory = useExerciseStore((state) => state.selectedCategory);
  const favoriteIds = useExerciseStore((state) => state.favoriteIds);
  const toggleFavorite = useExerciseStore((state) => state.toggleFavorite);

  // Compute filtered list locally
  const filtered = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || selectedCategory === "all" || ex.bodyPart === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 12;

  const indexOfLast = currentPage * exercisesPerPage;
  const indexOfFirst = indexOfLast - exercisesPerPage;
  const currentExercises = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / exercisesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Search />

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentExercises.length > 0 ? (
          currentExercises.map((exercise) => (
            <Link to={`/exercise/${exercise.id}`} key={exercise.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <img
                  src={
                    exercise.gifUrl
                      ? `https://exercisedb.p.rapidapi.com/exercises/gif/${exercise.gifUrl.split("/").pop()}`
                      : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop"
                  }
                  alt={exercise.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {exercise.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{exercise.bodyPart}</p>
                  <p className="text-xs text-gray-500 mt-1">Equipment: {exercise.equipment}</p>
                  <div
                    className="mt-2 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(exercise.id);
                    }}
                  >
                    <span className="text-2xl">{favoriteIds.includes(exercise.id) ? "⭐" : "☆"}</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {favoriteIds.includes(exercise.id) ? "Favorited" : "Favorite"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10 text-lg">
            No exercises found. Try adjusting your search or filter.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          <p className="text-gray-600">
            Showing {indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} results
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
            >
              Previous
            </button>
            <span className="px-2 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseLists;