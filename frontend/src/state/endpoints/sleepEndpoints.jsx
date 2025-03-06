import { elsApi } from "../elsApiSlice";

export const sleepEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getSleepByUserId: builder.query({
      query: (id) => ({
        url: `sleep/${id}`,
      }),
      providesTags: ["Sleep"],
      transformResponse: (response) => response,
    }),
    createSleepWithUserId: builder.mutation({
      query: ({ id, data }) => ({
        url: `sleep/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sleep"],
    }),
    updateSleepById: builder.mutation({
      query: ({ id, data }) => ({
        url: `sleep/${id}`,
        method: "PATCH",
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
