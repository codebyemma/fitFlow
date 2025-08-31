// components/Search.js
import { useState } from "react";
import useExerciseStore from "../stores/exerciseStore";
import { useDebounce } from "../hooks/useDebounce";

const Search = () => {
  const { categories, selectedCategory, setSelectedCategory, setSearchTerm } = useExerciseStore();

  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 0.5s debounce

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <div className="mb-8">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search exercises..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSearchTerm(e.target.value); // Optional: live search, debounce handles delay
        }}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="font-medium">Filter by Category:</label>
          <select
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Search;