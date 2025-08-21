import {
  CompanyListResponse,
  CompanyResponse,
  CreateCompanyRequest
} from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

const companyApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query<CompanyListResponse, void>({
      query: () => "/companies",
    }),
    getMyCompany: builder.query({
      query: () => "/companies/my-company",
    }),

    getCompanyById: builder.query<CompanyResponse, string>({
      query: (id) => `/companies/${id}`,
    }),
    getCompanyPostsById: builder.query({
      query: ({ id, page, limit }) => `/jobs/company/${id}?page=${page}&limit=${limit}`,
    }),

    createCompany: builder.mutation<CompanyResponse, CreateCompanyRequest>({
      query: (data) => ({
        url: "/companies",
        method: "POST",
        body: data,
      }),
    }),

    updateCompany: builder.mutation({
      query: ({ data }) => ({
        url: `/companies/update`,
        method: "PATCH",
        body: data,
      }),
    }),

    updateCompanyPosts: builder.mutation({
      query: ({id, data }) => ({
        url: `/jobs/admin/job/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteCompany: builder.mutation<CompanyResponse, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetMyCompanyQuery,
  useGetCompanyPostsByIdQuery,
  useUpdateCompanyPostsMutation
} = companyApi;
