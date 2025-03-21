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
      <div className="flex flex-col mt-4">
        <div className="flex justify-between">
          {/* Date of workout */}
          <span className="font-extrabold">{selectedWorkout?.date}</span>

          {/* Finish workout button */}
          {!selectedWorkout?.isCompleted && (
            <Button
              label="Befejez"
              className="bg-primary-green rounded-lg text-primary-white py-1 px-3 hover:bg-secondary-green active:bg-secondary-green hover:scale-101 hover:cursor-pointer dark:bg-dark-primary-green dark:hover:bg-dark-secondary-green dark:active:bg-dark-secondary-green transition-all duration-300 ease-out"
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
        </div>

        <ExerciseList workout={selectedWorkout} />

        {showAddExercise && (
          <AddExercise
            workoutId={selectedWorkout?.id}
            visible={showAddExercise}
            setVisible={setShowAddExercise}
          />
        )}

        {!selectedWorkout?.isCompleted && (
          <Button
            label="Gyakorlat hozzáadása"
            className="bg-primary-blue text-primary-white rounded-lg mt-15 py-2 hover:bg-secondary-blue active:bg-secondary-blue hover:scale-101 hover:cursor-pointer transition-all duration-300 ease-out dark:bg-dark-primary-blue dark:hover:bg-dark-secondary-blue dark:active:bg-dark-secondary-blue"
            onClick={() => setShowAddExercise(true)}
            unstyled
          />
        )}

        <Button
          label="Edzés törlése"
          className="bg-primary-red text-primary-white rounded-lg my-4 py-2 hover:bg-secondary-red active:bg-primary-red hover:scale-101 hover:cursor-pointer transition-all duration-300 ease-out"
          onClick={() => {
            deleteWorkout(selectedWorkout?.id, () => setVisible(false));
          }}
          unstyled
        />
      </div>
    </Dialog>
  );
};
