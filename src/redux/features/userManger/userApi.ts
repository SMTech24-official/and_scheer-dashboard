import { UserListResponse } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

const usersAPI = baseUrlApi.injectEndpoints({
   
    endpoints: (builder) => ({
       getAllUsers: builder.query<UserListResponse, { page: number; limit: number } >({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
      
    }),
        getUserById: builder.query({
        query: (id) => `/users/${id}`,
        
        }),
        createUser: builder.mutation({
        query: (data) => ({
            url: "/users",
            method: "POST",
            body: data,
        }),
         
        }),
        getProfileById:builder.query({
            query:(id)=>`/profiles/${id}`,
            
        }),


        updateUser: builder.mutation({
        query: ( data ) => ({
            url: `/users/update`,
            method: "PATCH",
            body: data,
        }),
  
        }),

        // susped

         profileSuspend: builder.mutation({
        query: (id) => ({
            url: `/users/suspend/${id}`,
            method: "PATCH",
         
        }),
     
        }),



        deleteUser: builder.mutation({
        query: (id) => ({
            url: `/users/delete/${id}`,
            method: "PATCH",
        }),
       
        }),
    }),
});

export const {
    useProfileSuspendMutation,
    useGetProfileByIdQuery,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersAPI;