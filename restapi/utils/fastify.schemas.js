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

const addSleepSchema = {
  body: {
    type: "object",
    properties: {
      date: { type: "string", format: "date-time" },
      durationHour: { type: "integer" },
      quality: { type: "string" },
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
  addSleepSchema,
};
