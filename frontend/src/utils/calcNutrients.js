export const calcNutrients = (food, quantityInGrams) => {
  const calories = Math.floor(food.caloriesPer100g * (quantityInGrams / 100));
  const protein = Math.floor(food.proteinPer100g * (quantityInGrams / 100));
  const carbs = Math.floor(food.carbsPer100g * (quantityInGrams / 100));
  const fats = Math.floor(food.fatsPer100g * (quantityInGrams / 100));
  return { calories, protein, carbs, fats };
};
