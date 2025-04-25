const createMealSchema = {
  body: {
    type: "object",
    properties: {
      type: { type: "string" },
      date: { type: "string", format: "date" },
    },
  },
};

module.exports = { createMealSchema };
