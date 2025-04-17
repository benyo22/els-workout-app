/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useUpdateSetByIdMutation } from "@/api/endpoints/setEndpoints";

export const DistanceCategory = ({ set, workoutIsFinished }) => {
  const [updateSet] = useUpdateSetByIdMutation();

  const getInitialValues = (totalMetes) => {
    const km = Math.floor(totalMetes / 1000);
    const m = Math.floor(totalMetes % 1000);
    return { km, m };
  };

  const [distance, setDistance] = useState(
    getInitialValues(set.distanceMeter || 0)
  );

  useEffect(() => {
    setDistance(getInitialValues(set.distanceMeter || 0));
  }, [set.distanceMeter]);

  const handleChange = async (e, type) => {
    let value = parseInt(e.target.value) || 0;

    if (type === "km") value = Math.min(99999, value); // max 99999 km
    if (type === "m") value = Math.min(999, value); // max 999

    const newDistance = { ...distance, [type]: value };
    setDistance(newDistance);

    const totalDistance = newDistance.km * 1000 + newDistance.m;

    await updateSet({
      setId: set.id,
      data: { distanceMeter: totalDistance },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Távolság</p>
      <div className="flex items-center gap-x-1">
        <input
          id="distance"
          name="distance"
          type="number"
          value={distance.km === 0 && !workoutIsFinished ? "" : distance.km}
          onChange={(e) => handleChange(e, "km")}
          className={`input w-15 h-7 mt-1 text-right ${
            workoutIsFinished ? "hover:shadow-none" : ""
          }`}
          disabled={workoutIsFinished}
        />
        <span>km</span>
        <input
          id="distance"
          name="distance"
          type="number"
          value={distance.m === 0 && !workoutIsFinished ? "" : distance.m}
          onChange={(e) => handleChange(e, "m")}
          className={`input w-15 h-7 mt-1 text-right ${
            workoutIsFinished ? "hover:shadow-none" : ""
          }`}
          disabled={workoutIsFinished}
        />
        <span>m</span>
      </div>
    </div>
  );
};
