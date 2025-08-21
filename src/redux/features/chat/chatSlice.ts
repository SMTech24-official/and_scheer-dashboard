import {
  CompanyListResponse,
} from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

const companyApi = baseUrlApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query<CompanyListResponse, void>({
      query: () => "/companies",
    }),
    getAllChatList: builder.query({
      query: () => "/chats/all-users",
    }),


   
  }),

});

export const {
  useGetAllCompaniesQuery,
 useGetAllChatListQuery
} = companyApi;
