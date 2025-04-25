import { elsApi } from "../elsApiSlice";

export const mealEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMealsByUserId: builder.query({
      query: (userId) => ({
        url: `meal/${userId}`,
      }),
      providesTags: ["Meals"],
      transformResponse: (response) => response,
    }),
    getMealsByUserIdAndDate: builder.query({
      query: ({ userId, date }) => ({
        url: `meal-by-date/${userId}/${date}`,
      }),
      providesTags: ["Meals"],
      transformResponse: (response) => response,
    }),
    createMealWithUserId: builder.mutation({
      query: ({ userId, data }) => ({
        url: `meal/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Meals"],
    }),
    deleteMealById: builder.mutation({
      query: (mealId) => ({
        url: `meal/${mealId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meals"],
    }),
  }),
});

export const {
  useGetMealsByUserIdQuery,
  useGetMealsByUserIdAndDateQuery,
  useCreateMealWithUserIdMutation,
  useDeleteMealByIdMutation,
} = mealEndpoints;
