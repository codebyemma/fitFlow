import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import useExerciseStore from "../stores/exerciseStore";
import NavBar from "./NavBar";

const ProgressionChart = ({exerciseId}) => {
    const { getExerciseLogs } = useExerciseStore();
    const logs = getExerciseLogs(exerciseId);

    const data = logs.map(l => ({
        date: l.date,
        weight: l.weight,
    }));

    return (
        <div className="p-4">
            <NavBar />
            <h2 className="text-lg font-bold mb-2">Progression</h2>
            <LineChart width={300} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default ProgressionChart;