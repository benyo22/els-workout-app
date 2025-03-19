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
    getExerciseById: builder.query({
      query: (exerciseId) => ({
        url: `exercises/${exerciseId}`,
      }),
      providesTags: ["Exercises"],
      transformResponse: (response) => response,
    }),
    getExcercisesInWorkout: builder.query({
      query: (workoutId) => ({
        url: `workout-exercises/${workoutId}`,
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
    updateExerciseById: builder.mutation({
      query: ({ id, data }) => ({
        url: `exercises/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Exercises"],
    }),
    addExerciseToWorkout: builder.mutation({
      query: ({ exerciseId, workoutId }) => ({
        url: `exercises/${exerciseId}/${workoutId}`,
        method: "POST",
      }),
      invalidatesTags: ["Exercises"],
    }),
    deleteExerciseById: builder.mutation({
      query: (exerciseId) => ({
        url: `exercises/${exerciseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exercises"],
    }),
  }),
});

export const {
  useGetAllExercisesQuery,
  useGetExerciseByIdQuery,
  useGetExcercisesInWorkoutQuery,
  useCreateExcerciseMutation,
  useUpdateExerciseByIdMutation,
  useAddExerciseToWorkoutMutation,
  useDeleteExerciseByIdMutation,
} = exerciseEndpoints;
