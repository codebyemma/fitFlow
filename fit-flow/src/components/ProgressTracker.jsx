import { useState, useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTracker = ({ exerciseId }) => {
  const { logs, exercises, getExerciseLogs } = useExerciseStore();
  const [selectedMetric, setSelectedMetric] = useState("weight");
  const [timeRange, setTimeRange] = useState("all");
  const [exerciseLogs, setExerciseLogs] = useState([]);
  
  useEffect(() => {
    if (exerciseId) {
      // Get logs for specific exercise
      const filteredLogs = getExerciseLogs(exerciseId);
      setExerciseLogs(filteredLogs);
    } else {
      // If no exerciseId provided, show all logs
      setExerciseLogs(logs);
    }
  }, [exerciseId, logs, getExerciseLogs]);

  const getExerciseName = (id) => {
  const exercise = exercises.find((ex) => String(ex.id) === String(id));
  if (!exercise) return "Unknown Exercise";
  const translation = exercise.translations?.find((t) => t.language === 2);
  return translation?.name || "Unnamed Exercise";
  };

  // Filter logs based on time range
  const getFilteredLogs = () => {
    if (timeRange === "all") return exerciseLogs;
    
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case "week":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "month":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3months":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        return exerciseLogs;
    }
    
    return exerciseLogs.filter(log => new Date(log.date) >= startDate);
  };

  // Group logs by exercise
  const getExerciseGroups = () => {
    const filteredLogs = getFilteredLogs();
    return filteredLogs.reduce((groups, log) => {
      if (!groups[log.exerciseId]) {
        groups[log.exerciseId] = [];
      }
      groups[log.exerciseId].push(log);
      return groups;
    }, {});
  };

  // Prepare chart data for a specific exercise
  const getChartData = (logs) => {
    // Sort logs by date
    const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      labels: sortedLogs.map(log => log.date),
      datasets: [
        {
          label: selectedMetric === "weight" ? "Weight (kg)" : 
                 selectedMetric === "reps" ? "Reps" : "Sets",
          data: sortedLogs.map(log => log[selectedMetric]),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1
        }
      ]
    };
  };

  // Calculate progress statistics
  const getProgressStats = (logs) => {
    if (logs.length < 2) return { improvement: 0, percentage: 0 };
    
    const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstValue = sortedLogs[0][selectedMetric];
    const lastValue = sortedLogs[sortedLogs.length - 1][selectedMetric];
    
    const improvement = lastValue - firstValue;
    const percentage = firstValue > 0 ? (improvement / firstValue) * 100 : 0;
    
    return { improvement, percentage };
  };

  const exerciseGroups = getExerciseGroups();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {exerciseId ? `Progress: ${getExerciseName(exerciseId)}` : "Workout Progress"}
        </h2>
        
        <div className="flex space-x-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="weight">Weight</option>
            <option value="reps">Reps</option>
            <option value="sets">Sets</option>
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="3months">Last 3 Months</option>
          </select>
        </div>
      </div>

      {Object.keys(exerciseGroups).length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No workout data available for the selected time range.
        </div>
      ) : (
        Object.entries(exerciseGroups).map(([exerciseId, logs]) => {
          const stats = getProgressStats(logs);
          
          return (
            <div key={exerciseId} className="mb-8 border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-600">
                  <Link to={`/exercise/${exerciseId}`} className="hover:underline">
                    {getExerciseName(exerciseId)}
                  </Link>
                </h3>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Progress: 
                  </span>
                  <span className={`font-medium ${stats.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.improvement > 0 ? '+' : ''}{stats.improvement.toFixed(1)} 
                    ({stats.improvement >= 0 ? '+' : ''}{stats.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="h-64">
                <Line 
                  data={getChartData(logs)} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: false,
                      }
                    }
                  }}
                />
              </div>
              
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reps</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sets</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...logs]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map(log => (
                        <tr key={log.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{log.date}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{log.weight}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{log.reps}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{log.sets}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProgressTracker;