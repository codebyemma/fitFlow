import { useState, useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import NavBar from "./NavBar";

const WorkoutTracker = () => {
    const { routines, logProgress, exercises, fetchExercises } = useExerciseStore();
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [form, setForm] = useState({weight: "", reps: "", sets: ""});

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
            date: new Date().toISOString().split('T')[0],
            exerciseId: selectedExercise.exerciseId,
            weight: Number(form.weight),
            reps: Number(form.reps),
            sets: Number(form.sets),
        });
        setForm({weight: "", reps: "", sets: ""});
        setSelectedExercise(null);
    };

    const getExerciseName = (exerciseId) => {
        const exercise = exercises.find(ex => ex.id === exerciseId);
        return exercise ? exercise.name : "Unknown Exercise";
    };

    return (
        <div className="p-4">
            <NavBar />
            <h1 className="text-2xl font-bold mb-4">Workout Tracker</h1>
            {routines.map((r) => (
                <div key={r.id} className="mb-6 border p-4 rounded">
                    <h2 className="text-xl font-semibold mb-3">{r.name}</h2>
                    {r.days.map((d) => (
                        <div key={d.id} className="mb-4 ml-4">
                            <h3 className="text-lg font-medium mb-2">{d.name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {d.workouts.map((w) => (
                                    <button 
                                        key={w.id} 
                                        onClick={() => setSelectedExercise(w)}
                                        className="text-left p-3 border rounded hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="font-medium">{getExerciseName(w.exerciseId)}</div>
                                        <div className="text-sm text-gray-600">
                                            {w.sets} sets × {w.reps} reps @ {w.weight || 0} kg
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            
            {selectedExercise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">
                            Log Workout: {getExerciseName(selectedExercise.exerciseId)}
                        </h3>
                        <div className="space-y-3">
                            <input 
                                type="number" 
                                placeholder="Weight (kg)" 
                                value={form.weight} 
                                onChange={(e) => setForm({...form, weight: e.target.value})}
                                className="w-full border p-2 rounded"
                            />
                            <input 
                                type="number" 
                                placeholder="Reps" 
                                value={form.reps} 
                                onChange={(e) => setForm({...form, reps: e.target.value})}
                                className="w-full border p-2 rounded"
                            />
                            <input 
                                type="number" 
                                placeholder="Sets" 
                                value={form.sets} 
                                onChange={(e) => setForm({...form, sets: e.target.value})}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button 
                                onClick={handleLog}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button 
                                onClick={() => setSelectedExercise(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutTracker;