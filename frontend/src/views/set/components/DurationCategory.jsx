/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUpdateSetByIdMutation } from "../../../state/endpoints/setEndpoints";

export const DurationCategory = ({ set, workoutIsCompleted }) => {
  const [updateSet] = useUpdateSetByIdMutation();

  const getInitialValues = (totalSeconds) => {
    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;
    return { hh, mm, ss };
  };

  const [time, setTime] = useState(getInitialValues(set.duration || 0));

  useEffect(() => {
    setTime(getInitialValues(set.duration || 0));
  }, [set.duration]);

  const handleChange = async (e, type) => {
    let value = parseInt(e.target.value) || 0;

    if (type === "hh") value = Math.min(99, value); // max 99 hours
    if (type === "mm" || type === "ss") value = Math.min(59, value); // max 59 minutes/seconds

    const newTime = { ...time, [type]: value };
    setTime(newTime);

    const totalSeconds = newTime.hh * 3600 + newTime.mm * 60 + newTime.ss;

    await updateSet({
      setId: set.id,
      data: { duration: totalSeconds },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Idő</p>
      <div className="flex items-center gap-x-0.5">
        <input
          id="duration"
          name="duration"
          type="number"
          value={time.hh === 0 && !workoutIsCompleted ? "" : time.hh}
          onChange={(e) => handleChange(e, "hh")}
          className={`input w-10 h-7 mt-1 text-right ${
            workoutIsCompleted ? "hover:shadow-none" : ""
          }`}
          disabled={workoutIsCompleted}
        />
        <span>:</span>
        <input
          id="duration"
          name="duration"
          type="number"
          value={time.mm === 0 && !workoutIsCompleted ? "" : time.mm}
          onChange={(e) => handleChange(e, "mm")}
          className={`input w-10 h-7 mt-1 text-right ${
            workoutIsCompleted ? "hover:shadow-none" : ""
          }`}
          disabled={workoutIsCompleted}
        />
        <span>:</span>
        <input
          id="duration"
          name="duration"
          type="number"
          value={time.ss === 0 && !workoutIsCompleted ? "" : time.ss}
          onChange={(e) => handleChange(e, "ss")}
          className={`input w-10 h-7 mt-1 text-right ${
            workoutIsCompleted ? "hover:shadow-none" : ""
          }`}
          disabled={workoutIsCompleted}
        />
      </div>
    </div>
  );
};
