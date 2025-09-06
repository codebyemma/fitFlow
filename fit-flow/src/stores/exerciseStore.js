// stores/exerciseStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useExerciseStore = create(
  persist(
    (set, get) => ({
      // State
      exercises: [],
      categories: [],
      selectedCategory: "all",
      searchTerm: "",
      favoriteIds: [],
      routines: [],
      logs: [],
      loading: false,
      error: null,

      
      // Computed: filtered exercises
      filtered: () => {
        const { exercises, searchTerm, selectedCategory } = get();
        return exercises.filter((ex) => {
          const translation = ex.translations?.find((t) => t.language === 2);
          const exerciseName = translation?.name || "";
          const matchesSearch = exerciseName.toLowerCase().includes((searchTerm || "").toLowerCase());
          const matchesCategory =
            !selectedCategory || selectedCategory === "all" || ex.bodyPart === selectedCategory;
          return matchesSearch && matchesCategory;
        });
      },

      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favId) => favId !== id)
            : [...state.favoriteIds, id],
        })),

      isFavorited: (id) => get().favoriteIds.includes(id),

      fetchExercises: async () => {
        set({ loading: true });
        try {
          let all = [];
          let url = "https://wger.de/api/v2/exerciseinfo/?language=2&limit=200";
          while (url) {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed: ${res.status}`);
            const data = await res.json();
            all = [...all, ...data.results];
            url = data.next;
          }
          set({ exercises: all });
        } catch (err) {
          console.error("Fetch failed:", err);
        } finally {
          set({ loading: false });
          console.log("Exercises fetched");
          console.log(get().exercises);
          console.log(all);
        }
      },

      addRoutine: (name) => {
        const trimmed = (name || "").trim();
        if (!trimmed) return; // do not create empty-named routines
        const newRoutine = { id: Date.now(), name: trimmed, days: [] };
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