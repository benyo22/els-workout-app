import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "@store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  credentials: "include",
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const elsApi = createApi({
  reducerPath: "elsApi",
  tagTypes: [
    "Users",
    "Workouts",
    "Exercises",
    "Sets",
    "Sleep",
    "Weights",
    "Meals",
    "Food",
  ],
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
