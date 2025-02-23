import { elsApi } from "../elsApiSlice";

export const userEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ name, age, email, username, password }) => ({
        url: "register",
        method: "POST",
        body: {
          name,
          age,
          email,
          username,
          password,
        },
      }),
    }),
  }),
});

export const { useRegisterMutation } = userEndpoints;
