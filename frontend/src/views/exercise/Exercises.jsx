/* eslint-disable react/prop-types */
import { AddExercise } from "./components/AddExercise";
import { ExerciseList } from "./components/ExerciseList";
import { useGetExcercisesInWorkoutQuery } from "../../state/endpoints/exerciseEndpoints";

export const Exercises = ({
  selectedWorkout,
  showAddExercise,
  setShowAddExercise,
}) => {
  const { data: exercisesInWorkout } = useGetExcercisesInWorkoutQuery(
    selectedWorkout?.id,
    { skip: !selectedWorkout?.id }
  );

  return (
    <>
      {/* Exercises in workout */}
      <ExerciseList
        workout={selectedWorkout}
        exercisesInWorkout={exercisesInWorkout}
      />

      {/* Adding exercises dialog */}
      {showAddExercise && (
        <AddExercise
          workoutId={selectedWorkout.id}
          setVisible={setShowAddExercise}
        />
      )}
    </>
  );
};
