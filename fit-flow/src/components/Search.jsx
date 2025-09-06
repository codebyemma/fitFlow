// components/Search.jsx
import { useState, useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import { useDebounce } from "../hooks/useDebounce";

const Search = () => {
  const { selectedCategory, setSelectedCategory, setSearchTerm, loading, exercises } = useExerciseStore();

  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 0.5s debounce

  // Update search term when debounced value changes
  useEffect(() => {
    setSearchTerm((debouncedSearchTerm || "").trim());
  }, [debouncedSearchTerm, setSearchTerm]);

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setSelectedCategory("");
  };

  const categories = ["all", ...new Set(exercises.map((ex) => ex.category?.name).filter(Boolean))];

  return (
    <div className="mb-8">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search exercises..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="font-medium">Filter by Category:</label>
          <select
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory || "all"}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loading}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Search;