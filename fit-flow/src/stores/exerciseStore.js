// stores/exerciseStore.js
import { create } from "zustand";

const useExerciseStore = create((set, get) => ({
  // State
  exercises: [],
  categories: [],
  selectedCategory: "",
  searchTerm: "",
  favoriteIds: [],

  // Computed: filtered exercises
  filtered: () => {
    const { exercises, searchTerm, selectedCategory } = get();
    return exercises.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || selectedCategory === "all" || ex.bodyPart === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },

  // Actions
  setExercises: (data) =>
    set({
      exercises: data,
      categories: ["all", ...new Set(data.map((ex) => ex.bodyPart))], // Include "all"
    }),

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favId) => favId !== id)
        : [...state.favoriteIds, id],
    })),

  isFavorited: (id) => get().favoriteIds.includes(id), // Fixed name
}));

export default useExerciseStore;