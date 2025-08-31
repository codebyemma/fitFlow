import { useParams } from "react-router-dom";
import useExerciseStore from "../stores/exerciseStore";
const DetailsPage = () => {
  const exerciseid = useParams().id;
  const { exercises } = useExerciseStore();
  const exercise = exercises.find((ex) => ex.id === exerciseid);

  return (
    <div>
      <h1>Exercise Details</h1>
      {exercise ? (
        <div>
          <h2>{exercise.name}</h2>
          <p>Body Part: {exercise.bodyPart}</p>
          <p>Equipment: {exercise.equipment}</p>
          <img src={exercise.gifUrl} alt={exercise.name} />
        </div>
      ) : (
        <p>Exercise not found.</p>
      )}
    </div>
  );
};

export default DetailsPage;
