import { elsApi } from "../elsApiSlice";

export const setEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getSetsInExercise: builder.query({
      query: ({ exerciseId, workoutId }) => ({
        url: `sets/${exerciseId}/${workoutId}`,
      }),
      providesTags: ["Sets"],
      transformResponse: (response) => response,
    }),
    // no need for "invalidatesTags: ["Sets"]" because after every creation bulkUpdateSets runs which has that tag and triggers the automatic refetch
    addSetToExercise: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `sets/${exerciseId}/${workoutId}`,
        method: "POST",
      }),
    }),
    updateSetById: builder.mutation({
      query: ({ setId, data }) => ({
        url: `sets/${setId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sets"],
    }),
    bulkUpdateSets: builder.mutation({
      query: (data) => ({
        url: "sets",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sets"],
    }),
    // no need for "invalidatesTags: ["Sets"]" because after every delete bulkUpdateSets runs which has that tag and triggers the automatic refetch
    deleteSetById: builder.mutation({
      query: (setId) => ({
        url: `sets/${setId}`,
        method: "DELETE",
      }),
    }),
    deleteAllSetsInExercise: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `sets-delete-all/${exerciseId}/${workoutId}`,
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
