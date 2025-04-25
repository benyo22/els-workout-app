import { elsApi } from "../elsApiSlice";

export const setEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getSetsInExercise: builder.query({
      query: ({ exerciseId, workoutId }) => ({
        url: `sets-in-exercise/${exerciseId}/${workoutId}`,
      }),
      providesTags: ["Sets"],
      transformResponse: (response) => response,
    }),
    // no need for "invalidatesTags: ["Sets"]" because after every creation bulkUpdateSets runs which has that tag and triggers the automatic refetch
    addSetToExercise: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `add-set-to-exercise/${exerciseId}/${workoutId}`,
        method: "POST",
      }),
    }),
    updateSetById: builder.mutation({
      query: ({ setId, data }) => ({
        url: `update-set/${setId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sets"],
    }),
    bulkUpdateSets: builder.mutation({
      query: (data) => ({
        url: "update-multiple-sets",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sets"],
    }),
    // no need for "invalidatesTags: ["Sets"]" because after every delete bulkUpdateSets runs which has that tag and triggers the automatic refetch
    deleteSetById: builder.mutation({
      query: (setId) => ({
        url: `delete-set/${setId}`,
        method: "DELETE",
      }),
    }),
    deleteAllSetsInExercise: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `delete-all-sets-in-exercise/${exerciseId}/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sets"],
    }),
  }),
});

export const {
  useGetSetsInExerciseQuery,
  useAddSetToExerciseMutation,
  useUpdateSetByIdMutation,
  useBulkUpdateSetsMutation,
  useDeleteSetByIdMutation,
  useDeleteAllSetsInExerciseMutation,
} = setEndpoints;
