/* eslint-disable react/prop-types */
import { EditFood } from "@features/food/EditFood";
import { FoodList } from "@features/food/FoodList";

export const Food = ({
  showFoodList,
  setShowFoodList,
  showEditFood,
  setShowEditFood,
  mealId,
  foodId,
}) => {
  return (
    <>
      {showFoodList && (
        <FoodList mealId={mealId} setShowFoodList={setShowFoodList} />
      )}

      {showEditFood && (
        <EditFood
          foodId={foodId}
          mealId={mealId}
          setShowEditFood={setShowEditFood}
        />
      )}
    </>
  );
};
