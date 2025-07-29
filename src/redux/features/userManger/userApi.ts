import { UserListResponse } from "../../../types/AllTypes";
import { baseUrlApi } from "../../api/baseUrlApi";

const usersAPI = baseUrlApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserListResponse,void>({
        query: () => "/users",
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
            query:(id)=>`/profiles/${id}`
        }),


        updateUser: builder.mutation({
        query: ({ id, data }) => ({
            url: `users/update${id}`,
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
            method: "DELETE",
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