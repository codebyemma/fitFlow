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
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {exerciseId ? `Progress: ${getExerciseName(exerciseId)}` : "Workout Progress"}
        </h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 shadow-md hover:shadow-lg text-gray-700 font-medium"
          >
            <option value="weight">💪 Weight</option>
            <option value="reps">🔄 Reps</option>
            <option value="sets">📊 Sets</option>
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 shadow-md hover:shadow-lg text-gray-700 font-medium"
          >
            <option value="all">🌟 All Time</option>
            <option value="week">📅 Last Week</option>
            <option value="month">📆 Last Month</option>
            <option value="3months">🗓️ Last 3 Months</option>
          </select>
        </div>
      </div>

      {Object.keys(exerciseGroups).length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 shadow-inner">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
            <p className="text-gray-500">Start logging your workouts to see progress charts here!</p>
          </div>
        </div>
      ) : (
        Object.entries(exerciseGroups).map(([exerciseId, logs]) => {
          const stats = getProgressStats(logs);
          
          return (
            <div key={exerciseId} className="mb-8 bg-gradient-to-r from-white via-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
                <h3 className="text-xl sm:text-2xl font-bold">
                  <Link to={`/exercise/${exerciseId}`} className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    {getExerciseName(exerciseId)}
                  </Link>
                </h3>
                
                <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-md">
                  <span className="text-sm font-medium text-gray-600">
                    Progress: 
                  </span>
                  <span className={`font-bold text-lg px-3 py-1 rounded-full ${stats.improvement >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {stats.improvement > 0 ? '📈 +' : stats.improvement < 0 ? '📉 ' : '➖ '}{stats.improvement.toFixed(1)} 
                    ({stats.improvement >= 0 ? '+' : ''}{stats.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="h-64 sm:h-80 lg:h-96 bg-white rounded-xl p-4 shadow-inner border border-gray-100">
                <Line 
                  data={getChartData(logs)} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          font: {
                            size: 14,
                            weight: 'bold'
                          },
                          color: '#374151'
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: {
                          color: '#f3f4f6'
                        },
                        ticks: {
                          font: {
                            size: 12,
                            weight: '500'
                          },
                          color: '#6b7280'
                        }
                      },
                      x: {
                        grid: {
                          color: '#f3f4f6'
                        },
                        ticks: {
                          font: {
                            size: 12,
                            weight: '500'
                          },
                          color: '#6b7280'
                        }
                      }
                    }
                  }}
                />
              </div>
              
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-600">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">📅 Date</th>
                        <th className="px-4 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">💪 Weight (kg)</th>
                        <th className="px-4 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">🔄 Reps</th>
                        <th className="px-4 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">📊 Sets</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[...logs]
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((log, index) => (
                          <tr key={log.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-150`}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.date}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{log.weight}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-purple-600">{log.reps}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">{log.sets}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProgressTracker;