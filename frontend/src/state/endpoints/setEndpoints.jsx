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
    addSetToExercise: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `sets/${exerciseId}/${workoutId}`,
        method: "POST",
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
  useDeleteSetByIdMutation,
  useDeleteAllSetsInExerciseMutation,
} = setEndpoints;
