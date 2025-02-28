import { elsApi } from "../elsApiSlice";

export const userEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByUsername: builder.query({
      query: ({ id }) => ({
        url: `user/${id}`,
      }),
      transformResponse: (response) => response,
    }),
    updateUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-user/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserByUsernameQuery, useUpdateUserByIdMutation } =
  userEndpoints;
