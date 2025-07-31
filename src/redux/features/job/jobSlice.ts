import { JobResponse, JobsListResponse, UpdateJobRequest } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";


const jobApi = baseUrlApi.injectEndpoints({
    endpoints: (builder) => ({
       getAllJobPosts: builder.query<JobsListResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/jobs/all-posts?page=${page}&limit=${limit}`,
     providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'Job' as const, id })),
              { type: 'Job', id: 'LIST' },
            ]
          : [{ type: 'Job', id: 'LIST' }],
    }),

        getMyJobPosts: builder.query({
            query: () => "/jobs/my-job-posts",
           
        }),
        createJobPost: builder.mutation({
            query: (data) => ({
                url: "/jobs/create-job-post",
                method: "POST",
                body: data,
            }),

        }),

        deleteJobPost: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "DELETE",
            }),
             invalidatesTags: ( id) => [
        { type: 'Job', id },
        { type: 'Job', id: 'LIST' },
        { type: 'Job', id: 'MY_LIST' }
      ],

        }),
        suspendJobPost: builder.mutation({
            query: (id) => ({
                url: `/jobs/${id}/suspend`,
                method: "PATCH",
            }),
            invalidatesTags: ( id) => [
        { type: 'Job', id },
        { type: 'Job', id: 'LIST' },
        { type: 'Job', id: 'MY_LIST' }
      ],
            
        }),

        updateJobPost: builder.mutation<JobResponse, { id: string; data: UpdateJobRequest }>({
            query: ({ id, data }) => ({
                url: `/jobs/${id}`,
                method: "PATCH",
                body: data,
            }),

        }),

    }),
});


export const {
    useSuspendJobPostMutation,
    useCreateJobPostMutation,
    useGetMyJobPostsQuery,
    useGetAllJobPostsQuery,
    useDeleteJobPostMutation,
    useUpdateJobPostMutation,
    // ...existing hooks
} = jobApi;

