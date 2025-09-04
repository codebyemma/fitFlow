import useExerciseStore from '../stores/exerciseStore';
import NavBar from './NavBar';

const Favorites = () => {
  const { favoriteIds, exercises } = useExerciseStore();

  const favoriteExercises = exercises.filter(ex => favoriteIds.includes(ex.id));

  return (
    <div>
      <NavBar />
      <h2>Your Favorite Exercises</h2>
      {favoriteExercises.length > 0 ? (
        <ul>
          {favoriteExercises.map(ex => (
            <li key={ex.id}>{ex.name}</li>
          ))}
        </ul>
      ) : (
        <p>No favorite exercises found.</p>
      )}
    </div>
  );
};

export default Favorites;