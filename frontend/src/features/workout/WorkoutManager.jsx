/* eslint-disable react/prop-types */
import { Exercises } from "@features/exercise/Exercises";
import { WorkoutManagerHeader } from "@features/workout/WorkoutManagerHeader";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

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
      header={<WorkoutManagerHeader selectedWorkout={selectedWorkout} />}
      visible
      modal
      draggable={false}
      onHide={() => {
        setVisible(false);
        setSelectedWorkout(null);
      }}
      className="w-full md:w-[30%] h-full"
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
