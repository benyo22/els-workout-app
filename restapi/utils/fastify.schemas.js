const registerSchema = {
  body: {
    type: "object",
    required: ["name", "age", "email", "username", "password"],
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
      email: { type: "string", format: "email" },
      username: { type: "string" },
      password: { type: "string", minLength: 6 },
    },
  },
};

const loginSchema = {
  body: {
    type: "object",
    required: ["password"],
    properties: {
      username: { type: "string" },
      email: { type: "string", format: "email" },
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
      email: { type: "string", format: "email" },
      username: { type: "string" },
    },
  },
};

module.exports = { registerSchema, loginSchema, updateProfileSchema };
