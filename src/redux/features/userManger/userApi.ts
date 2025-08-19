import { UserListResponse } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

const usersAPI = baseUrlApi.injectEndpoints({
   
    endpoints: (builder) => ({
       getAllUsers: builder.query<UserListResponse, { page: number; limit: number } >({
      query: ({ page, limit }) => `/users?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
        getUserById: builder.query({
        query: (id) => `/users/${id}`,
        providesTags: ( id) => [{ type: 'User', id }],
        }),
        createUser: builder.mutation({
        query: (data) => ({
            url: "/users",
            method: "POST",
            body: data,
        }),
         invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        getProfileById:builder.query({
            query:(id)=>`/profiles/${id}`,
             providesTags: ( id) => [{ type: 'Profile', id }],
        }),


        updateUser: builder.mutation({
        query: ( data ) => ({
            url: `/users/update`,
            method: "PATCH",
            body: data,
        }),
       invalidatesTags: ['Auth'],
        }),

        // susped

         profileSuspend: builder.mutation({
        query: (id) => ({
            url: `/users/suspend/${id}`,
            method: "PATCH",
         
        }),
        invalidatesTags: ( id) => [{ type: 'User', id }],
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