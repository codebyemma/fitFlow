import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import useExerciseStore from "../stores/exerciseStore";
import NavBar from "./NavBar";
import { useMemo } from "react";

const ProgressionChart = ({ exerciseId }) => {
    // Select only the logs relevant to this exercise so the component
    // re-renders when that slice of state changes (reactive update after logging)
    const logs = useExerciseStore((s) =>
        s.logs.filter((l) => String(l.exerciseId) === String(exerciseId))
    );

    // Sort by date and map to chart-friendly data; memoize to avoid
    // recomputing on unrelated renders.
    const data = useMemo(() => {
        if (!Array.isArray(logs) || logs.length === 0) return [];
        return logs
            .slice()
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((l) => ({ date: l.date, weight: Number(l.weight) || 0 }));
    }, [logs]);

    return (
        <div className="p-4">
            <NavBar />
            <h2 className="text-lg font-bold mb-2">Progression</h2>
            {data.length === 0 ? (
                <p className="text-gray-600">No logs yet for this exercise.</p>
            ) : (
                <LineChart width={300} height={200} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
            )}
        </div>
    );
};

export default ProgressionChart;