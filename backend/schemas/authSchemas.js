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

module.exports = { registerSchema, loginSchema };
