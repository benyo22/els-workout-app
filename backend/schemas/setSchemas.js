const createSetSchema = {
  body: {
    type: "object",
    properties: {
      setNumber: { type: "integer" },
      reps: { type: "integer" },
      weight: { type: "integer" },
      duration: { type: "integer" },
      distance: { type: "integer" },
      type: { type: "string" },
    },
  },
};

const bulkUpdateSetSchema = {
  body: {
    type: "array",
    items: {
      type: "object",
      properties: {
        setNumber: { type: "integer" },
        reps: { type: "integer" },
        weight: { type: "integer" },
        duration: { type: "integer" },
        distance: { type: "integer" },
        type: { type: "string" },
      },
    },
  },
};

module.exports = { bulkUpdateSetSchema, createSetSchema };
