import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const elsApi = createApi({
  reducerPath: "elsApi",
  tagTypes: ["Workouts", "Sleep", "Weights", "Meals"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:10001/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
