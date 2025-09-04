import { useState } from "react";
import useExerciseStore from "../stores/exerciseStore";
import Exercise from "./Exercise";
import NavBar from "./NavBar";

const RoutineBuilder = () => {
    const { routines, addRoutine, addDay, addWorkout } = useExerciseStore();
    const [routineName, setRoutineName] = useState("");
    const [dayName, setDayName] = useState("");
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [sets, setSets] = useState(3); // Add sets state

    return (
        <div className="p-4">
            <NavBar />
            <h1 className="text-2xl font-bold mb-2">Routine Builder</h1>
            <div className="mb-4">
                <input
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                placeholder="Routine name"
                className="border p-1 mr-2"/>
                <button
                onClick={() => {
                    addRoutine(routineName);
                    setRoutineName("");
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded"> Add Routine</button>
            </div>
            {routines.map((r) => (
                <div key={r.id}
                className="border p-2 mb-2">
                    <h2 className="font-semibold cursor-pointer"
                    onClick={() => setSelectedRoutine(r.id)}>{r.name}</h2>
                    {selectedRoutine === r.id && (
                        <div className="ml-4">
                            <input
                            value={dayName}
                            onChange={(e) => setDayName(e.target.value)}
                            placeholder="Day Name"
                            className="border p-1 mr-2"/>
                            <button
                            onClick={() => {
                                addDay(r.id, dayName);
                                setDayName("");
                            }}
                            className="bg-green-500 text-white px-2 py-1 rounded">Add Day</button>
                            {
                                r.days.map((d) => (
                                    <div key={d.id}
                                    className="mt-2">
                                        <h3
                                        className="cursor-pointer"
                                        onClick={() => setSelectedDay(d.id)}>{d.name}</h3>
                                        {selectedDay === d.id && (
                                            <div>
                                                <input
                                                    type="number"
                                                    value={sets}
                                                    onChange={(e) => setSets(Number(e.target.value))}
                                                    placeholder="Sets"
                                                    className="border p-1 mr-2 w-20"
                                                    min="1"
                                                />
                                                <Exercise onSelect={(ex) => addWorkout(r.id, d.id, {
                                                    exerciseId: ex.id,
                                                    name: ex.name,
                                                    sets: sets,
                                                    reps: 8,
                                                    weight: 0,
                                                })}
                                                />
                                            </div>
                                        )}
                                        <ul className="ml-4 list-disc">
                                            {d.workouts.map((w) => (
                                                <li key={w.id}>
                                                    {w.name} - {w.sets} * {w.reps} @ {w.weight}Kg
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            }
                            </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RoutineBuilder;