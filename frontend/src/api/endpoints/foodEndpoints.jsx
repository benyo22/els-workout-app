import { elsApi } from "../elsApiSlice";

export const foodEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFood: builder.query({
      query: () => ({
        url: "food",
      }),
      providesTags: ["Food"],
      transformResponse: (response) => response,
    }),
    getAllFoodInMeal: builder.query({
      query: (mealId) => ({
        url: `food-in-meal/${mealId}`,
      }),
      providesTags: ["Food"],
      transformResponse: (response) => response,
    }),
    getFoodQuantity: builder.query({
      query: ({ foodId, mealId }) => ({
        url: `food-quantity/${foodId}/${mealId}`,
      }),
      providesTags: ["Food"],
      transformResponse: (response) => response,
    }),
    addFoodToMeal: builder.mutation({
      query: ({ foodId, mealId, quantityInGrams }) => ({
        url: `add-food-to-meal/${foodId}/${mealId}`,
        method: "POST",
        body: { quantityInGrams },
      }),
      invalidatesTags: ["Food", "Meals"],
    }),
    createFood: builder.mutation({
      query: (data) => ({
        url: "food",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Food"],
    }),
    editFoodQuantity: builder.mutation({
      query: ({ foodId, mealId, quantityInGrams }) => ({
        url: `food/${foodId}/${mealId}`,
        method: "PATCH",
        body: { quantityInGrams },
      }),
      invalidatesTags: ["Food", "Meals"],
    }),
    removeFoodFromMeal: builder.mutation({
      query: ({ foodId, mealId }) => ({
        url: `remove-food-from-meal/${foodId}/${mealId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Food", "Meals"],
    }),
  }),
});

export const {
  useGetFoodQuantityQuery,
  useGetAllFoodQuery,
  useGetAllFoodInMealQuery,
  useAddFoodToMealMutation,
  useCreateFoodMutation,
  useEditFoodQuantityMutation,
  useRemoveFoodFromMealMutation,
} = foodEndpoints;
