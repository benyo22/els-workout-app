const { Meal, Food, MealFood } = require("./models");

async function asd() {
  const meals = await Meal.findAll({
    include: [
      {
        model: MealFood,
        include: [Food],
      },
    ],
  });

  console.log(JSON.stringify(meals, null, 2));
}

asd();
