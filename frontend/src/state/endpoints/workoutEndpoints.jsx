import { elsApi } from "../elsApiSlice";

export const workoutEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkoutByUserId: builder.query({
      query: (id) => ({
        url: `workout/${id}`,
      }),
      providesTags: ["Workouts"],
      transformResponse: (response) => response,
    }),
    createWorkoutWithUserId: builder.mutation({
      query: ({ id, data }) => ({
        url: `workout/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workouts"],
    }),
    closeWorkoutById: builder.mutation({
      query: (id) => ({
        url: `workout/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Workouts"],
    }),
    deleteWorkoutById: builder.mutation({
      query: (id) => ({
        url: `workout/${id}`,
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
