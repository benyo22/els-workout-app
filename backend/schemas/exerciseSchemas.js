const createExerciseSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      bodyPart: { type: "string" },
      category: { type: "string" },
    },
  },
};

module.exports = { createExerciseSchema };
