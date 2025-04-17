/* eslint-disable react/prop-types */
import { useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { Exercises } from "@/views/exercise/Exercises";
import { WorkoutManagerHeader } from "@/views/workout/components/WorkoutManagerHeader";

export const WorkoutManager = ({
  setVisible,
  selectedWorkout,
  setSelectedWorkout,
  deleteWorkout,
  finishWorkout,
}) => {
  const [showAddExercise, setShowAddExercise] = useState(false);

  const handleFinisWorkout = () => {
    finishWorkout(selectedWorkout, () => {
      setVisible(false);
      // row selection works fine because of this
      setTimeout(() => {
        setSelectedWorkout(null);
      }, 100);
    });
  };

  return (
    <Dialog
      header={
        <WorkoutManagerHeader
          setVisible={setVisible}
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
        />
      }
      visible
      modal
      draggable={false}
      closable={false}
      closeOnEscape={false}
      className="bg-primary-white shadow-lg border-1 border-primary-grey dark:bg-dark-medium rounded-lg max-w-full w-full md:max-w-md h-[700px] p-4 overflow-y-auto"
      unstyled
    >
      <div className="flex flex-col mt-4">
        <div className="flex justify-between">
          {/* Date of workout */}
          <span className="font-extrabold">{selectedWorkout.date}</span>

          {/* Finish workout button */}
          {!selectedWorkout.isFinished && (
            <Button
              label="Befejez"
              className="green-button"
              onClick={handleFinisWorkout}
              unstyled
            />
          )}
        </div>

        <Exercises
          selectedWorkout={selectedWorkout}
          showAddExercise={showAddExercise}
          setShowAddExercise={setShowAddExercise}
        />

        {/* Add exercise button */}
        {!selectedWorkout.isFinished && (
          <Button
            label="Gyakorlat hozzáadása"
            className="blue-button my-4"
            onClick={() => setShowAddExercise(true)}
            unstyled
          />
        )}

        {/* Delete workout button */}
        <Button
          label="Edzés törlése"
          className="red-button my-4"
          onClick={() => {
            deleteWorkout(selectedWorkout.id, () => setVisible(false));
          }}
          unstyled
        />
      </div>
    </Dialog>
  );
};
