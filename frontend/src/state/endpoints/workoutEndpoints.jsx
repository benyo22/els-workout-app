import { elsApi } from "../elsApiSlice";

export const workoutEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkoutByUserId: builder.query({
      query: (userId) => ({
        url: `workout/${userId}`,
      }),
      providesTags: ["Workouts"],
      transformResponse: (response) => response,
    }),
    createWorkoutWithUserId: builder.mutation({
      query: ({ userId, data }) => ({
        url: `workout/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workouts"],
    }),
    finishWorkoutById: builder.mutation({
      query: (workoutId) => ({
        url: `workout-close/${workoutId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Workouts"],
    }),
    editWorkoutById: builder.mutation({
      query: ({ workoutId, data }) => ({
        url: `workout-edit/${workoutId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Workouts"],
    }),
    deleteWorkoutById: builder.mutation({
      query: ({ workoutId }) => ({
        url: `workout/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workouts"],
    }),
  }),
});

export const {
  useGetWorkoutByUserIdQuery,
  useCreateWorkoutWithUserIdMutation,
  useFinishWorkoutByIdMutation,
  useEditWorkoutByIdMutation,
  useDeleteWorkoutByIdMutation,
} = workoutEndpoints;
