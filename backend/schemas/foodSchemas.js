const createFoodSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      proteinPer100g: { type: "integer" },
      carbsPer100g: { type: "integer" },
      fatsPer100g: { type: "integer" },
      fatsPer100g: { type: "integer" },
    },
  },
};

const foodQuantitySchema = {
  body: {
    type: "object",
    properties: {
      quantityInGrams: { type: "integer" },
    },
  },
};

module.exports = { createFoodSchema, foodQuantitySchema };
