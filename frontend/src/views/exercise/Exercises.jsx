/* eslint-disable react/prop-types */
import { AddExercise } from "@/views/exercise/components/AddExercise";
import { ExerciseList } from "@/views/exercise/components/ExerciseList";

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
