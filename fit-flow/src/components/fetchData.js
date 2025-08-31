// hooks/useFetchExercises.js
import { useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";
import axios from "axios";

const useFetchExercises = () => {
  const { exercises, setExercises } = useExerciseStore();

  useEffect(() => {
    const fetchExercises = async () => {
      if (exercises.length > 0) return; // Prevent re-fetch

      try {
        const options = {
          method: "GET",
          url: "https://exercisedb.p.rapidapi.com/exercises", // Fixed: removed extra spaces
          params: { limit: 100 }, // Increased limit
          headers: {
            "X-RapidAPI-Key": "56612155d0mshe7035dad844d606p187aadjsn539cce4b2e9e",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [exercises.length, setExercises]);
};

export default useFetchExercises;