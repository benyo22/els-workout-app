const createWeightSchema = {
  body: {
    type: "object",
    properties: {
      weight: { type: "number" },
      date: { type: "string", format: "date" },
    },
  },
};

module.exports = { createWeightSchema };
