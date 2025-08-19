import {  Plan } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

export const subscriptionPlanApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({

    getSubscriptionPlans: build.query<Plan[], void>({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),
   
    }),

    createPlan: build.mutation({
      query: (data) => ({
        url: "/plans/create-plan",
        method: "POST",
        body: data,
      }),
    }),
    deletePlan: build.mutation({
      query: (id) => ({
        url: `plans/${id}`,
        method: "DELETE",
      }),
    }),

    
    getAllTransaction: build.query({
      query: () => "/transactions",
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useGetAllTransactionQuery,
  useCreatePlanMutation,
  useDeletePlanMutation
  // Correct hook for the 'createPlan' mutation
} = subscriptionPlanApi;
