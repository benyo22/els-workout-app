/* eslint-disable react/prop-types */
import { useCreateMealWithUserIdMutation } from "@api/endpoints/mealEndpoints";
import { mealLabels, mealTypes } from "@data/data";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { Button } from "primereact/button";
import { useState } from "react";

export const CreateMeal = ({ userId, formattedDate }) => {
  const [error, setError] = useState(null);
  const [createMeal] = useCreateMealWithUserIdMutation();

  const handleCreateMeal = async (type) => {
    setError(null);
    const result = await createMeal({
      userId,
      data: { type, date: formattedDate },
    });

    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-4 mb-4">
        {mealTypes.map((type) => (
          <Button
            key={type}
            label={`+ ${mealLabels[type]}`}
            onClick={() => handleCreateMeal(type)}
            className="blue-button px-4"
            unstyled
          />
        ))}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
};
