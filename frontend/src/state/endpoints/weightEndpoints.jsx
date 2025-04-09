import { elsApi } from "../elsApiSlice";

export const weightEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeightByUserId: builder.query({
      query: (userId) => ({
        url: `weight/${userId}`,
      }),
      providesTags: ["Weights"],
      transformResponse: (response) => response,
    }),
    createWeightWithUserId: builder.mutation({
      query: ({ userId, data }) => ({
        url: `weight/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Weights"],
    }),
    updateWeightById: builder.mutation({
      query: ({ weightId, data }) => ({
        url: `weight/${weightId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Weights"],
    }),
    deleteWeightById: builder.mutation({
      query: (weightId) => ({
        url: `weight/${weightId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Weights"],
    }),
  }),
});

export const {
  useGetWeightByUserIdQuery,
  useCreateWeightWithUserIdMutation,
  useUpdateWeightByIdMutation,
  useDeleteWeightByIdMutation,
} = weightEndpoints;
