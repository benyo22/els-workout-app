/* eslint-disable react/prop-types */
import { useUpdateSetByIdMutation } from "../../../state/endpoints/setEndpoints";

export const DistanceCategory = ({ set, workoutIsCompleted }) => {
  const [updateSet] = useUpdateSetByIdMutation();

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Távolság</p>
      <div className="flex items-center gap-x-1">
        <input
          id="distance"
          name="distance"
          type="number"
          onChange={async (e) => {
            const distance = parseInt(e.target.value);
            await updateSet({
              setId: set.id,
              data: { distance },
            });
          }}
          value={set.distance === 0 ? "" : set.distance}
          className="input w-30 h-7 mt-1 text-right"
          disabled={workoutIsCompleted}
        />
        <span>m</span>
      </div>
    </div>
  );
};
