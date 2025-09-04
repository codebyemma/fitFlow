//import ExerciseList from "./components/ExerciseList";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import DetailsPage from "./components/DetailsPage";
import ProgressionChart from "./components/ProgressionChart";
import WorkoutTracker from "./components/WorkoutTracker";
import RoutineBuilder from "./components/RoutineBuilder";
import Favorites from "./components/Favorites";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/exercise/:id" element={<DetailsPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/progress" element={<ProgressionChart />} />
        <Route path="/history" element={<WorkoutTracker />} />
        <Route path="/plans" element={<RoutineBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
