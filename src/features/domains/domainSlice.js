import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
  }),
  tagTypes: ["Domains"],
  endpoints: (builder) => ({
    // Fetch all domains
    getDomains: builder.query({
      query: () => "/",
      providesTags: ["Domains"],
    }),
    // Fetch a single domain
    getDomain: builder.query({
      query: (id) => `/${id}`,
    }),
    // Add a new domain
    addDomain: builder.mutation({
      query: (newDomain) => ({
        url: "/",
        method: "POST",
        body: newDomain,
      }),
      invalidatesTags: ["Domains"],
    }),
    // Update an existing domain
    updateDomain: builder.mutation({
      query: ({ id, ...updated }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updated,
      }),
      invalidatesTags: ["Domains"],
    }),
    // Delete a domain
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Domains"],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi;
