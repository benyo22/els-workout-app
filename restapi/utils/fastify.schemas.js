const registerSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
      email: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
    },
  },
};

const loginSchema = {
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
  },
};

const getUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
  },
};

const updateUserSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
      email: { type: "string" },
      username: { type: "string" },
    },
  },
};

const updatePasswordSchema = {
  body: {
    type: "object",
    properties: {
      oldPassword: { type: "string" },
      newPassword: { type: "string" },
    },
  },
};

const deleteUserSchema = {
  body: {
    type: "object",
    properties: {
      password: { type: "string" },
    },
  },
};

const createSleepSchema = {
  body: {
    type: "object",
    properties: {
      date: { type: "string", format: "date-time" },
      durationHour: { type: "integer" },
      quality: { type: "string" },
    },
  },
};

const createWeightSchema = {
  body: {
    type: "object",
    properties: {
      weight: { type: "number" },
      date: { type: "string", format: "date-time" },
    },
  },
};

const createWorkoutSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      date: { type: "string", format: "date-time" },
    },
  },
};

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

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
  getUserSchema,
  deleteUserSchema,
  createSleepSchema,
  createWeightSchema,
  createWorkoutSchema,
  createExerciseSchema,
  createSetSchema,
};
