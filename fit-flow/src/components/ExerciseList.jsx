import React, { useState, useEffect } from 'react';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your RapidAPI key
  const RAPIDAPI_KEY = '56612155d0mshe7035dad844d606p187aadjsn539cce4b2e9e';

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setExercises(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <div className="loading">Loading exercises...</div>;
  if (error) return <div className="error">Failed to load exercises: {error}</div>;

  return (
    <div className="exercise-list">
      <h1>Fitness Exercise Database</h1>
      <p>Total Exercises: {exercises.length}</p>

      {exercises.map((exercise) => (
        <div key={exercise.id || exercise.name} className="exercise-card">
          <h2>{exercise.name}</h2>
          <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
          <p><strong>Target Muscle:</strong> {exercise.target}</p>
          <p><strong>Equipment:</strong> {exercise.equipment}</p>
          <p><strong>Difficulty:</strong> {exercise.difficulty || 'N/A'}</p>

          <h3>Instructions:</h3>
          <ol>
            {exercise.instructions && exercise.instructions.length > 0 ? (
              exercise.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <li>No instructions available</li>
            )}
          </ol>

          {exercise.gifUrl && (
            <div className="gif-container">
              <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;