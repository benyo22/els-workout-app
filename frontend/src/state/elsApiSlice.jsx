import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const elsApi = createApi({
  reducerPath: "elsApi",
  // tagTypes: ["Jobs", "Experiences", "Applicants"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: () => ({}),
});
