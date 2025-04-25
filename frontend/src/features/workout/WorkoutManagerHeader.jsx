/* eslint-disable react/prop-types */
import { useUpdateWorkoutByIdMutation } from "@api/endpoints/workoutEndpoints";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const WorkoutManagerHeader = ({ selectedWorkout }) => {
  const [updateWorkout] = useUpdateWorkoutByIdMutation();
  const [name, setName] = useState(selectedWorkout.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (name.trim() && name !== selectedWorkout.name) {
      updateWorkout({ workoutId: selectedWorkout.id, data: { name } });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between sticky top-0">
      {isEditing ? (
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className="input w-[50%] h-10"
          unstyled
        />
      ) : (
        <p
          className={`mt-3 font-semibold text-xl ${
            selectedWorkout.isFinished ? "" : "cursor-pointer"
          }`}
          onClick={() => !selectedWorkout.isFinished && setIsEditing(true)}
        >
          {name || "Új edzés"}
        </p>
      )}
    </div>
  );
};
