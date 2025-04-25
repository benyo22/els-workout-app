/* eslint-disable react/prop-types */
import {
  useGetAllFoodInMealQuery,
  useGetAllFoodQuery,
} from "@api/endpoints/foodEndpoints";
import { AddFood } from "@features/food/AddFood";
import { CreateFood } from "@features/food/CreateFood";
import { FoodItem } from "@features/food/FoodItem";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

export const FoodList = ({ mealId, setShowFoodList }) => {
  const [food, setFood] = useState([]);
  const { data: foodData } = useGetAllFoodQuery();
  const { data: foodInMeal } = useGetAllFoodInMealQuery(mealId);

  const [foodId, setFoodId] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFood, setShowAddFood] = useState(false);
  const [showCreateFood, setShowCreateFood] = useState(false);

  useEffect(() => {
    if (foodData && foodInMeal) {
      let filtered = foodData.filter((food) => {
        return !foodInMeal.some((foodMeal) => foodMeal.id === food.id);
      });

      if (searchTerm) {
        filtered = filtered.filter((exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFood(filtered);
    }
  }, [foodData, searchTerm, foodInMeal]);

  return (
    <>
      {showAddFood && (
        <AddFood
          foodId={foodId}
          mealId={mealId}
          setShowAddFood={setShowAddFood}
          setShowFoodList={setShowFoodList}
        />
      )}
      {showCreateFood && <CreateFood setShowCreateFood={setShowCreateFood} />}

      <Dialog
        header={
          <Button
            label="Új Étel"
            className="text-primary-blue cursor-pointer hover:text-third-blue dark:text-dark-primary-blue dark:hover:text-dark-secondary-blue"
            onClick={() => setShowCreateFood(true)}
            unstyled
          />
        }
        modal
        visible
        draggable={false}
        onHide={() => setShowFoodList(false)}
      >
        {/* Search bar */}
        <FloatLabel className="mt-6">
          <InputText
            id="search"
            name="search"
            value={searchTerm}
            onInput={(e) => setSearchTerm(e.target.value)}
            className="input"
            unstyled
          />
          <label htmlFor="search" className="font-bold">
            Étel keresése
          </label>
        </FloatLabel>

        {/* Food */}
        <h3 className="mt-4 font-bold">Ételek:</h3>
        <div className="flex flex-col gap-2 mt-4 h-[450px] p-2 overflow-y-auto">
          {food.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Nincs találat
            </div>
          ) : (
            food.map((food) => (
              <FoodItem
                key={food.id}
                food={food}
                onSelect={() => {
                  setFoodId(food.id);
                  setShowAddFood(true);
                }}
              />
            ))
          )}
        </div>
      </Dialog>
    </>
  );
};
