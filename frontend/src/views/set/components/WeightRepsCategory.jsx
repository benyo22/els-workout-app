/* eslint-disable react/prop-types */
import { useUpdateSetByIdMutation } from "../../../state/endpoints/setEndpoints";

export const WeightRepsCategory = ({ set, workoutIsCompleted }) => {
  const [updateSet] = useUpdateSetByIdMutation();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p>kg</p>
        <input
          id="weight"
          name="weight"
          type="number"
          onChange={async (e) => {
            const weight = parseInt(e.target.value);
            await updateSet({
              setId: set.id,
              data: { weight },
            });
          }}
          value={set.weight === 0 ? "" : set.weight}
          className="input w-30 h-7 mt-1 text-right"
          disabled={workoutIsCompleted}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p>Ismétlés</p>
        <input
          id="reps"
          name="reps"
          type="number"
          onChange={async (e) => {
            const reps = parseInt(e.target.value);
            await updateSet({
              setId: set.id,
              data: { reps },
            });
          }}
          value={set.reps === 0 ? "" : set.reps}
          className="input w-30 h-7 mt-1 text-right"
          disabled={workoutIsCompleted}
        />
      </div>
    </>
  );
};
