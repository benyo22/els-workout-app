/* eslint-disable react/prop-types */
import { AddExercise } from "@features";
import { ExerciseList } from "@features";

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
