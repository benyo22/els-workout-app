import { elsApi } from "../elsApiSlice";

export const sleepEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getSleepByUserId: builder.query({
      query: (userId) => ({
        url: `sleep/${userId}`,
      }),
      providesTags: ["Sleep"],
      transformResponse: (response) => response,
    }),
    createSleepWithUserId: builder.mutation({
      query: ({ userId, data }) => ({
        url: `sleep/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sleep"],
    }),
    updateSleepById: builder.mutation({
      query: ({ id, data }) => ({
        url: `sleep/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sleep"],
    }),
    deleteSleepById: builder.mutation({
      query: (id) => ({
        url: `sleep/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sleep"],
    }),
  }),
});

export const {
  useGetSleepByUserIdQuery,
  useCreateSleepWithUserIdMutation,
  useUpdateSleepByIdMutation,
  useDeleteSleepByIdMutation,
} = sleepEndpoints;
