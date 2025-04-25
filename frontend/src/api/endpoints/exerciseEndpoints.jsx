import { elsApi } from "../elsApiSlice";

export const exerciseEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExercises: builder.query({
      query: () => ({
        url: "exercises",
      }),
      providesTags: ["Exercises"],
      transformResponse: (response) => response,
    }),
    getExcercisesInWorkout: builder.query({
      query: (workoutId) => ({
        url: `exercises-in-workout/${workoutId}`,
      }),
      providesTags: ["Exercises"],
      transformResponse: (response) => response,
    }),
    createExcercise: builder.mutation({
      query: (data) => ({
        url: "exercises",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Exercises"],
    }),
    addExerciseToWorkout: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `add-exercise-to-workout/${exerciseId}/${workoutId}`,
        method: "POST",
      }),
      invalidatesTags: ["Exercises"],
    }),
    removeExerciseFromWorkout: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `remove-exercise-from-workout/${exerciseId}/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exercises"],
    }),
  }),
});

export const {
  useGetAllExercisesQuery,
  useGetExcercisesInWorkoutQuery,
  useCreateExcerciseMutation,
  useAddExerciseToWorkoutMutation,
  useRemoveExerciseFromWorkoutMutation,
} = exerciseEndpoints;
