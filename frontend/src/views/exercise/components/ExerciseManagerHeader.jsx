/* eslint-disable react/prop-types */
import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";

export const ExerciseManagerHeader = ({
  workoutName,
  setSelectedWorkout,
  visible,
  setVisible,
}) => (
  <header className="flex justify-between sticky top-0">
    <p className="mt-3 font-semibold text-xl">{workoutName || "Új edzés"}</p>
    <Button
      onClick={() => {
        if (!visible) return;
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
  </header>
);
