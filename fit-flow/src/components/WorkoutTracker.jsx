import { useState, useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const WorkoutTracker = () => {
  const { routines, logProgress, exercises, fetchExercises } = useExerciseStore();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [form, setForm] = useState({ weight: "", reps: "", sets: "" });

  // Fetch exercises when component mounts
  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercises();
    }
  }, [exercises.length, fetchExercises]);

  const handleLog = () => {
    if (!selectedExercise || !form.weight || !form.reps || !form.sets) {
      alert("Please fill in all fields");
      return;
    }

    logProgress({
      date: new Date().toISOString().split("T")[0],
      exerciseId: selectedExercise.exerciseId,
      weight: Number(form.weight),
      reps: Number(form.reps),
      sets: Number(form.sets),
    });
    setForm({ weight: "", reps: "", sets: "" });
    setSelectedExercise(null);
  };

  const getExerciseName = (exerciseId) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (!exercise) return "Unknown Exercise";
    const translation = exercise.translations?.find((t) => t.language === 2);
    return translation?.name || "Unnamed Exercise";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Workout Tracker</h1>

        {routines.map((r) => (
          <div
            key={r.id}
            className="mb-8 border border-gray-200 rounded-xl bg-white shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Routine: {r.name}
            </h2>

            {r.days.map((d) => (
              <div key={d.id} className="mb-6">
                <h3 className="text-lg font-medium text-purple-700 mb-3">
                  Day: {d.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {d.workouts.map((w) => (
                    <div
                      key={w.id}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow hover:shadow-md transition"
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          {w.exerciseId ? (
                            <Link
                              to={`/exercise/${w.exerciseId}`}
                              className="text-blue-600 hover:underline"
                            >
                              {getExerciseName(w.exerciseId)}
                            </Link>
                          ) : (
                            <span>{getExerciseName(w.exerciseId)}</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {w.sets} sets × {w.reps} reps @ {w.weight || 0} kg
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedExercise(w)}
                          className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                        >
                          Log Progress
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Log Workout:{" "}
              <span className="text-blue-600">
                {getExerciseName(selectedExercise.exerciseId)}
              </span>
            </h3>

            <div className="space-y-4">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Reps"
                value={form.reps}
                onChange={(e) => setForm({ ...form, reps: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Sets"
                value={form.sets}
                onChange={(e) => setForm({ ...form, sets: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLog}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-medium transition"
              >
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;
