import { elsApi } from "../elsApiSlice";

export const userEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
      providesTags: ["Users"],
      transformResponse: (response) => response,
    }),
    updateUserById: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUserById: builder.mutation({
      query: ({ id, password }) => ({
        url: `user/${id}`,
        method: "DELETE",
        body: { password },
      }),
      invalidatesTags: ["Users"],
    }),
    updatePasswordById: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useUpdatePasswordByIdMutation,
} = userEndpoints;
