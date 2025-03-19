/* eslint-disable react/prop-types */
import { useState } from "react";

import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

export const Exercises = ({
  visible,
  setVisible,
  selectedWorkout,
  handleWorkoutDelete,
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
        <p className="font-extrabold">{selectedWorkout?.date}</p>

        <h3>Exercises</h3>
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

        <Button
          label="Gyakorlat hozzáadása"
          className="bg-primary-blue text-primary-white rounded-lg mt-4 py-2 hover:bg-secondary-blue hover:scale-101 hover:cursor-pointer transition-all ease-out dark:bg-dark-primary-blue dark:hover:bg-dark-secondary-blue"
          onClick={() => addExercise(selectedWorkout?.id)}
          unstyled
        />

        <Button
          label="Edzés törlése"
          className="bg-primary-red text-primary-white rounded-lg my-4 py-2 hover:bg-secondary-red hover:scale-101 hover:cursor-pointer transition-all ease-out"
          onClick={async () => {
            handleWorkoutDelete(selectedWorkout?.id);
            setVisible(false);
          }}
          unstyled
        />
      </div>
    </Dialog>
  );
};
