const createWorkoutSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      date: { type: "string", format: "date" },
    },
  },
};

module.exports = { createWorkoutSchema };
