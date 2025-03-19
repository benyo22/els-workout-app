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
    closeWorkoutById: builder.mutation({
      query: (workoutId) => ({
        url: `workout/${workoutId}`,
        method: "PATCH",
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
  useCloseWorkoutByIdMutation,
  useDeleteWorkoutByIdMutation,
} = workoutEndpoints;
