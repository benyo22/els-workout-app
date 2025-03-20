/* eslint-disable react/prop-types */
import { useState } from "react";

import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

import { useAddExerciseToWorkoutMutation } from "../../../state/endpoints/exerciseEndpoints";

export const ExerciseManager = ({
  visible,
  setVisible,
  selectedWorkout,
  deleteWorkout,
  finishWorkout,
}) => {
  // const weekday = [
  //   "Vasárnap",
  //   "Hétfő",
  //   "Kedd",
  //   "Szerda",
  //   "Csütörtök",
  //   "Péntek",
  //   "Szombat",
  // ];
  const [addExercise] = useAddExerciseToWorkoutMutation();

  return (
    <Dialog
      header={selectedWorkout?.name || "Új edzés"}
      visible={visible}
      maximizable
      style={{ width: "50vw" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="font-extrabold">{selectedWorkout?.date}</span>
          {!selectedWorkout?.isCompleted && (
            <Button
              label="Befejez"
              className="bg-primary-green rounded-lg text-primary-white py-1 px-3 hover:bg-secondary-green hover:scale-101 hover:cursor-pointer dark:bg-dark-primary-green dark:hover:bg-dark-secondary-green transition-all duration-300 ease-out"
              onClick={() => {
                finishWorkout(selectedWorkout, () => setVisible(false));
              }}
              unstyled
            />
          )}
        </div>

        {selectedWorkout?.exercises?.map((exercise, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-blue-500">{exercise.name}</h4>

            <DataTable value={exercise.sets} className="p-datatable-sm">
              <Column
                field="setIndex"
                header="Set"
                body={(rowData, options) => options.rowIndex + 1}
              />
              <Column
                field="previousWeight"
                header="Previous"
                body={(rowData) =>
                  `${rowData.previousWeight} kg × ${rowData.previousReps}`
                }
              />
              <Column field="weight" header="Kg" />
              <Column field="reps" header="Reps" />
              <Column
                field="completed"
                header="✔"
                body={(rowData) => (rowData.completed ? "✅" : "❌")}
              />
            </DataTable>
          </div>
        ))}

        {!selectedWorkout?.isCompleted && (
          <Button
            label="Gyakorlat hozzáadása"
            className="bg-primary-blue text-primary-white rounded-lg mt-15 py-2 hover:bg-secondary-blue hover:scale-101 hover:cursor-pointer transition-all duration-300 ease-out dark:bg-dark-primary-blue dark:hover:bg-dark-secondary-blue"
            onClick={() =>
              addExercise({
                exerciseId: exercise.id,
                workoutId: selectedWorkout?.id,
              })
            }
            unstyled
          />
        )}

        <Button
          label="Edzés törlése"
          className="bg-primary-red text-primary-white rounded-lg my-4 py-2 hover:bg-secondary-red hover:scale-101 hover:cursor-pointer transition-all duration-300 ease-out"
          onClick={() => {
            deleteWorkout(selectedWorkout?.id);
            setVisible(false);
          }}
          unstyled
        />
      </div>
    </Dialog>
  );
};
