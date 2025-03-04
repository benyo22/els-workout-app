import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const elsApi = createApi({
  reducerPath: "elsApi",
  tagTypes: ["Users", "Workouts", "Sleep", "Weights", "Meals"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
//TODO: add .env for baseurl
