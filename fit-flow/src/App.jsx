//import ExerciseList from "./components/ExerciseList";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import DetailsPage from "./components/DetailsPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/exercise/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
