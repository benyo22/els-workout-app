/* eslint-disable react/prop-types */
import { useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { AddExercise } from "./components/AddExercise";
import { ExerciseList } from "./components/ExerciseList";
import { ExerciseManagerHeader } from "./components/ExerciseManagerHeader";

export const ExerciseManager = ({
  visible,
  setVisible,
  selectedWorkout,
  setSelectedWorkout,
  deleteWorkout,
  finishWorkout,
}) => {
  const [showAddExercise, setShowAddExercise] = useState(false);

  return (
    <Dialog
      header={
        <ExerciseManagerHeader
          workoutName={selectedWorkout?.name}
          setSelectedWorkout={setSelectedWorkout}
          visible={visible}
          setVisible={setVisible}
        />
      }
      visible={visible}
      draggable={false}
      closable={false}
      closeOnEscape={false}
      className="bg-primary-white shadow-lg border-1 border-primary-grey dark:bg-dark-medium rounded-lg max-w-full w-full md:max-w-md h-[500px] 2xl:h-[700px] p-4"
      unstyled
    >
      <main className="flex flex-col mt-4">
        <section className="flex justify-between">
          {/* Date of workout */}
          <span className="font-extrabold">{selectedWorkout?.date}</span>

          {/* Finish workout button */}
          {!selectedWorkout?.isCompleted && (
            <Button
              label="Befejez"
              className="green-button"
              onClick={() => {
                finishWorkout(selectedWorkout, () => {
                  setVisible(false);
                  // row selection works fine because of this
                  setTimeout(() => {
                    setSelectedWorkout(null);
                  }, 100);
                });
              }}
              unstyled
            />
          )}
        </section>

        {/* Exercises in workout */}
        <ExerciseList workout={selectedWorkout} />

        {/* Adding exercises dialog */}
        {showAddExercise && (
          <AddExercise
            workoutId={selectedWorkout?.id}
            visible={showAddExercise}
            setVisible={setShowAddExercise}
          />
        )}

        {/* Add exercise button */}
        {!selectedWorkout?.isCompleted && (
          <Button
            label="Gyakorlat hozzáadása"
            className="blue-button"
            onClick={() => setShowAddExercise(true)}
            unstyled
          />
        )}

        {/* Delete workout button */}
        <Button
          label="Edzés törlése"
          className="red-button"
          onClick={() => {
            deleteWorkout(selectedWorkout?.id, () => setVisible(false));
          }}
          unstyled
        />
      </main>
    </Dialog>
  );
};
