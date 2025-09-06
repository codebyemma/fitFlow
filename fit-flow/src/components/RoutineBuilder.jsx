// src/components/RoutineBuilder.jsx
import { useState } from "react";
import useExerciseStore from "../stores/exerciseStore";
import Exercise from "./Exercise";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const RoutineBuilder = () => {
  const { routines, addRoutine, addDay, addWorkout } = useExerciseStore();
  const [routineName, setRoutineName] = useState("");
  const [dayName, setDayName] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [sets, setSets] = useState(3);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Routine Builder
      </h1>

      {/* Add Routine */}
      <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Routine name"
          className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 flex-1 w-full"
        />
        <button
          onClick={() => {
            if (!routineName.trim()) return;
            addRoutine(routineName.trim());
            setRoutineName("");
          }}
          disabled={!routineName.trim()}
          className={`px-4 py-2 rounded-lg transition-all duration-200 w-full sm:w-auto ${
            routineName.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add Routine
        </button>
      </div>

      {/* Routines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((r) => (
          <div
            key={r.id}
            className="border border-gray-200 p-4 rounded-lg shadow-md bg-white"
          >
            <h2
              className="font-semibold text-xl cursor-pointer text-blue-700 hover:text-blue-900"
              onClick={() =>
                setSelectedRoutine(selectedRoutine === r.id ? null : r.id)
              }
            >
              {r.name}
            </h2>

            {selectedRoutine === r.id && (
              <div className="mt-4">
                {/* Add Day */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                  <select
                    value={dayName}
                    onChange={(e) => setDayName(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg shadow-sm"
                  >
                    <option value="">Select day</option>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      const trimmed = dayName.trim();
                      if (!trimmed) return;
                      const exists = r.days?.some((dd) => dd.name === trimmed);
                      if (!exists) {
                        addDay(r.id, trimmed);
                        setDayName("");
                      }
                    }}
                    disabled={!dayName.trim()}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 w-full sm:w-auto ${
                      dayName.trim()
                        ? "bg-green-500 text-white hover:bg-green-600 shadow"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Add Day
                  </button>
                </div>

                {/* Days */}
                {r.days.map((d) => (
                  <div
                    key={d.id}
                    className="mt-3 border-t border-gray-100 pt-3"
                  >
                    <h3
                      className="cursor-pointer text-purple-700 font-medium hover:underline"
                      onClick={() =>
                        setSelectedDay(selectedDay === d.id ? null : d.id)
                      }
                    >
                      {d.name}
                    </h3>

                    {selectedDay === d.id && (
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Sets input */}
                        <div className="flex items-center gap-2">
                          <label className="font-medium text-gray-700">
                            Sets:
                          </label>
                          <input
                            type="number"
                            value={sets}
                            onChange={(e) => setSets(Number(e.target.value))}
                            placeholder="Sets"
                            className="border border-gray-300 p-2 w-20 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                            min="1"
                          />
                        </div>

                        {/* Exercise selector */}
                        <div className="flex-1 w-full">
                          <Exercise
                            onSelect={(ex) =>
                              addWorkout(r.id, d.id, {
                                exerciseId: ex.id,
                                name:
                                  ex.translations?.find(
                                    (t) => t.language === 2
                                  )?.name || "Unnamed Exercise",
                                sets,
                                reps: 8,
                                weight: 0,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Workouts */}
                    <ul className="ml-6 mt-3 list-disc text-gray-700 space-y-1">
                      {d.workouts.map((w) => (
                        <li key={w.id}>
                          {w.exerciseId ? (
                            <Link
                              to={`/exercise/${w.exerciseId}`}
                              className="text-blue-600 hover:underline"
                            >
                              {w.name}
                            </Link>
                          ) : (
                            <span>{w.name}</span>
                          )}{" "}
                          - {w.sets} × {w.reps} @ {w.weight} Kg
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineBuilder;
