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
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userEndpoints;
