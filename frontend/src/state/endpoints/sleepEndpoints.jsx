import { elsApi } from "../elsApiSlice";

export const sleepEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getSleep: builder.query({
      query: () => ({
        url: "sleep",
      }),
      providesTags: ["Sleep"],
      transformResponse: (response) => response,
    }),
    createSleep: builder.mutation({
      query: (data) => ({
        url: "sleep",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sleep"],
    }),
    updateSleep: builder.mutation({
      query: ({ id, data }) => ({
        url: `sleep/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sleep"],
    }),
    deleteSleep: builder.mutation({
      query: (id) => ({
        url: `sleep/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sleep"],
    }),
  }),
});

export const {
  useGetSleepQuery,
  useCreateSleepMutation,
  useUpdateSleepMutation,
  useDeleteSleepMutation,
} = sleepEndpoints;
