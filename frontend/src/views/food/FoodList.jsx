/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import { FoodItem } from "@/views/food/components/FoodItem";
import {
  useGetAllFoodQuery,
  useGetAllFoodInMealQuery,
} from "@/api/endpoints/foodEndpoints";
import { AddFood } from "@/views/food/components/AddFood";
import { CreateFood } from "@/views/food/components/CreateFood";

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
          <header className="flex justify-between">
            <Button
              label="Új Étel"
              className="text-primary-blue cursor-pointer hover:text-third-blue mt-2 ml-2 dark:text-dark-primary-blue dark:hover:text-dark-secondary-blue"
              onClick={() => setShowCreateFood(true)}
              unstyled
            />

            <Button
              onClick={() => {
                setShowFoodList(false);
              }}
              className="text-md text-[#6B7381] hover:bg-[#F2F4F7] rounded-full p-2 mt-2 mr-2 hover:cursor-pointer dark:hover:bg-[#242F3D] dark:text-[#9498A0]"
              unstyled
            >
              <FaXmark />
            </Button>
          </header>
        }
        modal
        visible
        draggable={false}
        closable={false}
        closeOnEscape={false}
        className="flex flex-col gap-y-6 bg-primary-white dark:bg-dark-medium shadow-lg border-1 border-primary-grey rounded-lg max-w-full w-full md:max-w-md h-[700px] p-4"
        unstyled
      >
        {/* Search bar */}
        <FloatLabel>
          <InputText
            id="search"
            name="search"
            value={searchTerm}
            onInput={(e) => setSearchTerm(e.target.value)}
            className="input"
            unstyled
          />
          <label htmlFor="search">Étel keresése</label>
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
