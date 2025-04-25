const createSleepSchema = {
  body: {
    type: "object",
    properties: {
      date: { type: "string", format: "date" },
      durationHour: { type: "integer" },
      quality: { type: "string" },
    },
  },
};

module.exports = { createSleepSchema };
