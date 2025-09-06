import { useEffect } from "react";
import useExerciseStore from "../stores/exerciseStore";

const FetchAllExercises = () => {
  const { setExercises, setLoading } = useExerciseStore();

  useEffect(() => {
  /**
   * Fetches all exercises from wger.de, language=2, in chunks of 200.
   * Stores the fetched exercises in the store and sets loading to false on success or failure.
   */
    const fetchAllExercises = async () => {
      let allExercises = [];
      let url = "https://wger.de/api/v2/exerciseinfo/?language=2&limit=200";

      try {
        while (url) {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          allExercises = [...allExercises, ...data.results];
          url = data.next;
        }
        setExercises(allExercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
        alert("Could not load exercises. Check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllExercises();
  }, []);
  return null; // This component doesn't render anything directly
};

export default FetchAllExercises;// It just fetches and sets exercises in the store