/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { useUpdateWorkoutByIdMutation } from "@api";

export const WorkoutManagerHeader = ({
  setVisible,
  selectedWorkout,
  setSelectedWorkout,
}) => {
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

      <Button
        onClick={() => {
          setVisible(false);
          // row selection works fine because of this
          setTimeout(() => {
            setSelectedWorkout(null);
          }, 100);
        }}
        className="text-md text-[#6B7381] hover:bg-[#F2F4F7] rounded-full p-2 mt-2 mr-2 hover:cursor-pointer dark:hover:bg-[#242F3D] dark:text-[#9498A0]"
        unstyled
      >
        <FaXmark />
      </Button>
    </div>
  );
};
