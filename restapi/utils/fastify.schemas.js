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
    required: ["password"],
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    anyOf: [{ required: ["username"] }, { required: ["email"] }],
  },
};

const updateProfileSchema = {
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
    required: ["oldPassword", "newPassword"],
    properties: {
      oldPassword: { type: "string" },
      newPassword: { type: "string" },
    },
  },
};

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  updatePasswordSchema,
};
