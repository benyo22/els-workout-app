const isObjectEmpty = (obj) => {
  return JSON.stringify(obj) === "{}";
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const calcNutrients = (food, quantityInGrams) => {
  const calories = Math.floor(food.caloriesPer100g * (quantityInGrams / 100));
  const protein = Math.floor(food.proteinPer100g * (quantityInGrams / 100));
  const carbs = Math.floor(food.carbsPer100g * (quantityInGrams / 100));
  const fats = Math.floor(food.fatsPer100g * (quantityInGrams / 100));
  return { calories, protein, carbs, fats };
};

const bodyParts = [
  "core",
  "arms",
  "back",
  "chest",
  "legs",
  "shoulders",
  "other",
  "full body",
];
const isGoodBodyPart = (bodyPart) => {
  if (!bodyParts.includes(bodyPart)) return false;
  return true;
};

const categories = [
  "barbell",
  "dumbell",
  "cable",
  "machine",
  "bodyweight",
  "cardio",
  "duration",
  "distance",
  "other",
];
const isGoodCategory = (category) => {
  if (!categories.includes(category)) return false;
  return true;
};

const setTypes = ["warm-up", "dropset", "failure", "/"];
const isGoodSetType = (setType) => {
  if (!setTypes.includes(setType)) return false;
  return true;
};

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
const isGoodMealType = (mealType) => {
  if (!mealTypes.includes(mealType)) return false;
  return true;
};

module.exports = {
  calcNutrients,
  isGoodBodyPart,
  isGoodCategory,
  isGoodMealType,
  isGoodSetType,
  isObjectEmpty,
  validateEmail,
};
