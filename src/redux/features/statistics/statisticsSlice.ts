import { baseUrlApi } from "../../api/baseUrlApi";





export const statisticsApi = baseUrlApi.injectEndpoints({
    endpoints: (builder) =>({
        getStatistics: builder.query({
            query: () => "/statistics",
            
            // transformResponse: (response) => (response as { data: StatisticsResponce }).data,
        }),
       getStaticsLogins:builder.query({
            query: () => "/statistics/login-stats",
        }),
        
    })
}

)

export const {
    useGetStatisticsQuery,
    useGetStaticsLoginsQuery,
} = statisticsApi;
