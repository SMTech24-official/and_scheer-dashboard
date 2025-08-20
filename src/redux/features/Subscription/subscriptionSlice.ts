
import { baseUrlApi } from "../../api/baseUrlApi";

export const subscriptionPlanApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({

    getSubscriptionPlans: build.query({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),
   providesTags:['plans']
    }),

    createPlan: build.mutation({
      query: (data) => ({
        url: "/plans/create-plan",
        method: "POST",
        body: data,
      }),
          invalidatesTags: ['plans'], 
    }),

    updatePlan: build.mutation({
      query: ({id,data}) => ({
        url:`/plans/${id}`,
        method: "PATCH",
        body: data,
      }),
          invalidatesTags: ['plans'], 
    }),
    deletePlan: build.mutation({
      query: (id) => ({
        url: `plans/${id}`,
        method: "DELETE",
      }),
          invalidatesTags: ['plans'], 
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
  useDeletePlanMutation,
  useUpdatePlanMutation
  // Correct hook for the 'createPlan' mutation
} = subscriptionPlanApi;
