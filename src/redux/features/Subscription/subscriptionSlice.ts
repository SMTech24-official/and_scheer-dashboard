import { ApiResponse, Plan } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";


export const subscriptionPlanApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionPlans: build.query<Plan[], void>({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),
      // Transform the API response to return just the data array
      transformResponse: (response: ApiResponse<Plan[]>) => response.data,
    }),
    getAllTransaction: build.query({
      query: () => "/transactions",
    }),
  }),
  
});

export const { useGetSubscriptionPlansQuery , useGetAllTransactionQuery} = subscriptionPlanApi;