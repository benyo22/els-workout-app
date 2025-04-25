/* eslint-disable react/prop-types */
import { AddExercise } from "@features/exercise/AddExercise";
import { ExerciseList } from "@features/exercise/ExerciseList";

export const Exercises = ({
  selectedWorkout,
  showAddExercise,
  setShowAddExercise,
}) => (
  <>
    {/* Exercises in workout */}
    <ExerciseList workout={selectedWorkout} />

    {/* Adding exercises dialog */}
    {showAddExercise && (
      <AddExercise
        workoutId={selectedWorkout.id}
        setVisible={setShowAddExercise}
      />
    )}
  </>
);
