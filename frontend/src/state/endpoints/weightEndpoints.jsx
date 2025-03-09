import { elsApi } from "../elsApiSlice";

export const weightEndpoints = elsApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeightByUserId: builder.query({
      query: (id) => ({
        url: `weight/${id}`,
      }),
      providesTags: ["Weights"],
      transformResponse: (response) => response,
    }),
    createWeightWithUserId: builder.mutation({
      query: ({ id, data }) => ({
        url: `weight/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Weights"],
    }),
    updateWeightById: builder.mutation({
      query: ({ id, data }) => ({
        url: `weight/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Weights"],
    }),
    deleteWeightById: builder.mutation({
      query: (id) => ({
        url: `weight/${id}`,
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
