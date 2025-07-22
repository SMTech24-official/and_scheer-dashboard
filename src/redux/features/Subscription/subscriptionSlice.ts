import { baseUrlApi } from "../../api/baseUrlApi";

const subscriptionPlanApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscirptionPlans: build.query({
      query: () => ({
        url: "/plans",
        method: "GET",
       
      }),
    }),
  }),
});

export const { useGetSubscirptionPlansQuery } = subscriptionPlanApi;
