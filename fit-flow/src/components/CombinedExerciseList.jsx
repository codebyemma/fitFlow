import React, { useState, useEffect } from 'react';

// 🔑 Replace with your ExerciseDB RapidAPI key
const RAPIDAPI_KEY = '56612155d0mshe7035dad844d606p187aadjsn539cce4b2e9e';

const CombinedExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // 1. Get exercises from wger API
        const wgerRes = await fetch('https://wger.de/api/v2/exerciseinfo/?language=2&limit=12');
        const wgerData = await wgerRes.json();

        const wgerExercises = wgerData.results.map(ex => ({
          id: ex.id,
          name: ex.exercises?.[0]?.name || 'Unknown',
          category: ex.category.name,
          muscles: ex.muscles.map(m => m.name).join(', '),
          equipment: ex.equipment.map(e => e.name).join(', ') || 'body weight',
        }));

        // 2. For each exercise, fetch enhanced data (GIF + description) from ExerciseDB
        const enrichedExercises = await Promise.all(
          wgerExercises.map(async (ex) => {
            try {
              // Clean exercise name for URL
              const cleanName = encodeURIComponent(ex.name.trim());

              const response = await fetch(
                `https://exercisedb.p.rapidapi.com/exercises/name/${cleanName}`,
                {
                  method: 'GET',
                  headers: {
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                  },
                }
              );

              if (!response.ok) {
                console.warn(`ExerciseDB: ${ex.name} not found`);
                return { ...ex, gifUrl: null, instructions: [] };
              }

              const data = await response.json();
              const exercise = Array.isArray(data) ? data[0] : data;

              return {
                ...ex,
                gifUrl: exercise.gifUrl || null,
                instructions: exercise.instructions || [],
                target: exercise.target || ex.muscles,
                bodyPart: exercise.bodyPart || 'general',
              };
            } catch (err) {
              console.error(`Failed to fetch ExerciseDB for ${ex.name}`, err);
              return { ...ex, gifUrl: null, instructions: [] };
            }
          })
        );

        setExercises(enrichedExercises);
        setLoading(false);
      } catch (err) {
        console.error('Fetch failed:', err);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <p style={styles.loading}>Loading exercises with GIFs...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏋️ Exercise Library (wger + ExerciseDB)</h1>
      <p style={styles.subtitle}>Real GIFs & Clear Instructions</p>

      {exercises.map((ex) => (
        <div key={ex.id} style={styles.card}>
          <h3>{ex.name}</h3>
          <p><strong>Muscles:</strong> {ex.muscles}</p>
          <p><strong>Equipment:</strong> {ex.equipment}</p>
          <p><strong>Type:</strong> {ex.category}</p>

          {ex.gifUrl ? (
            <div style={styles.gifContainer}>
              <img src={ex.gifUrl} alt={ex.name} style={styles.gif} />
            </div>
          ) : (
            <p style={styles.noGif}>No GIF available</p>
          )}

          <h4>📝 How to Do It:</h4>
          <ol>
            {ex.instructions.length > 0 ? (
              ex.instructions.map((step, i) => <li key={i}>{step}</li>)
            ) : (
              <li>Follow proper form. Keep back straight and move slowly.</li>
            )}
          </ol>
        </div>
      ))}
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f7f9fc',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    margin: '40px 0',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  gifContainer: {
    textAlign: 'center',
    margin: '10px 0',
  },
  gif: {
    maxWidth: '300px',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  noGif: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
  },
};

export default CombinedExerciseList;