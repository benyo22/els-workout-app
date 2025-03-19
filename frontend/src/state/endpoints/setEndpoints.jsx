import { elsApi } from "../elsApiSlice";

export const setEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getSetsForExercise: builder.query({
      query: (exerciseId) => ({
        url: `sets/${exerciseId}`,
      }),
      providesTags: ["Sets"],
      transformResponse: (response) => response,
    }),
    addSetToExercise: builder.mutation({
      query: ({ exerciseId, userId, data }) => ({
        url: `sets/${exerciseId}/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sets"],
    }),
    updateSetById: builder.mutation({
      query: ({ setId, data }) => ({
        url: `sets/${setId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sets"],
    }),
    deleteSetById: builder.mutation({
      query: (setId) => ({
        url: `sets/${setId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sets"],
    }),
  }),
});

export const {
  useGetSetsForExerciseQuery,
  useAddSetToExerciseMutation,
  useUpdateSetByIdMutation,
  useDeleteSetByIdMutation,
} = setEndpoints;
