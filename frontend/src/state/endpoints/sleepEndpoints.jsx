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
      query: ({ sleepId, data }) => ({
        url: `sleep/${sleepId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sleep"],
    }),
    deleteSleepById: builder.mutation({
      query: (sleepId) => ({
        url: `sleep/${sleepId}`,
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
