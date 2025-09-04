// stores/exerciseStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useExerciseStore = create(
  persist(
    (set, get) => ({
      // State
      exercises: [],
      categories: [],
      selectedCategory: "",
      searchTerm: "",
      favoriteIds: [],
      routines: [],
      logs: [],
      loading: false,
      error: null,

      fetchExercises: async () => {
        set({ loading: true, error: null });
        try {
          // Fetch exercises (English language id=2)
          const exercisesRes = await fetch(
            "https://wger.de/api/v2/exerciseinfo/?language=2&limit=200"
          );
          if (!exercisesRes.ok) {
            throw new Error(`Exercises HTTP ${exercisesRes.status}`);
          }
          const exercisesJson = await exercisesRes.json();

          // Fetch main images for exercises (optional)
          const imagesRes = await fetch(
            "https://wger.de/api/v2/exerciseimage/?is_main=true&limit=500"
          );
          if (!imagesRes.ok) {
            throw new Error(`Images HTTP ${imagesRes.status}`);
          }
          const imagesJson = await imagesRes.json();
          const exerciseIdToImageUrl = new Map(
            (imagesJson.results || []).map((img) => [img.exercise, img.image])
          );

          // Helper to strip HTML from wger description
          const stripHtml = (html) =>
            typeof html === "string" ? html.replace(/<[^>]*>/g, " ").trim() : "";

          // Normalize shape to app schema
          const normalized = (exercisesJson.results || []).map((ex) => {
            const name = ex.name;
            const descriptionHtml = ex.description || "";
            const equipmentArray = Array.isArray(ex.equipment) ? ex.equipment : [];
            const equipmentNames = equipmentArray.length > 0 ? equipmentArray.map((e) => e.name).join(", ") : "";
            const frontImage = exerciseIdToImageUrl.get(ex.id) || "";

            // Build a richer object compatible with ExerciseCard/MuscleDiagram
            return {
              id: String(ex.id),
              name,
              bodyPart: ex.category && ex.category.name ? ex.category.name : "",
              equipment: equipmentArray, // array of { id, name }
              equipmentNames, // convenience flat string
              frontImage,
              images: frontImage ? [{ image: frontImage }] : [],
              videos: Array.isArray(ex.videos) ? ex.videos : [],
              category: ex.category || { name: ex.category?.name || "" },
              muscles: Array.isArray(ex.muscles) ? ex.muscles : [],
              muscles_secondary: Array.isArray(ex.muscles_secondary) ? ex.muscles_secondary : [],
              translations: [
                { language: 2, name, description: descriptionHtml }
              ],
              license: ex.license || {
                short_name: "CC-BY-SA",
                url: "https://wger.de/en/software/license"
              },
              license_author: ex.license_author || "wger contributors",
              // Keep existing simplified fields for backward compatibility
              gifUrl: frontImage,
              instructions: stripHtml(descriptionHtml),
            };
          });

          set({
            exercises: normalized,
            loading: false,
            categories: ["all", ...new Set(normalized.map((ex) => ex.bodyPart).filter(Boolean))],
            error: null,
          });
        } catch (error) {
          console.error("Failed to fetch exercises:", error);
          set({ exercises: [], loading: false, error: error.message });
        }
      },

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
          categories: ["all", ...new Set(data.map((ex) => ex.bodyPart))],
          loading: false,
          error: null
        }),

      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favId) => favId !== id)
            : [...state.favoriteIds, id],
        })),

      isFavorited: (id) => get().favoriteIds.includes(id),

      addRoutine: (name) => {
        const newRoutine = { id: Date.now(), name, days: [] };
        set({ routines: [...get().routines, newRoutine] });
      },

      addDay: (routineId, dayName) => {
        const routines = get().routines.map((r) =>
          r.id === routineId 
            ? { ...r, days: [...r.days, { id: Date.now(), name: dayName, workouts: [] }] } 
            : r
        );
        set({ routines });
      },

      addWorkout: (routineId, dayId, workout) => {
        const routines = get().routines.map((r) => 
          r.id === routineId 
            ? {
                ...r, 
                days: r.days.map((d) => 
                  d.id === dayId 
                    ? {
                        ...d, 
                        workouts: [
                          ...d.workouts, 
                          {
                            ...workout, 
                            id: Date.now(), 
                            progressionStep: 2.5, 
                            targetReps: workout.reps || 8, 
                            failureCount: 0, 
                            deloadPercent: 0.9,
                          }
                        ]
                      }
                    : d
                )
              }
            : r
        );
        set({ routines });
      },

      logProgress: ({ date, exerciseId, weight, reps, sets }) => {
        const logs = [...get().logs, { id: Date.now(), date, exerciseId, weight, reps, sets }];
        set({ logs });

        let updatedRoutines = get().routines.map((routine) => ({
          ...routine,
          days: routine.days.map((day) => ({
            ...day,
            workouts: day.workouts.map((w) => {
              if (w.exerciseId === exerciseId) {
                let updated = { ...w };

                if (reps >= w.targetReps) {
                  updated.weight = weight + w.progressionStep;
                  updated.failureCount = 0;
                } else {
                  updated.failureCount = (updated.failureCount || 0) + 1;
                  if (updated.failureCount >= 3) {
                    updated.weight = Math.max(Math.round((weight * w.deloadPercent) * 2) / 2, 0);
                    updated.failureCount = 0;
                  }
                }
                return updated;
              }
              return w;
            }),
          })),
        }));

        set({ routines: updatedRoutines });
      },

      getExerciseLogs: (exerciseId) => {
        return get().logs.filter((log) => log.exerciseId === exerciseId);
      },

      clearError: () => set({ error: null }),
    }),
    { name: "workout-storage" }
  )
);

export default useExerciseStore;