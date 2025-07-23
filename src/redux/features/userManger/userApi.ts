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
        updateUser: builder.mutation({
        query: ({ id, data }) => ({
            url: `users/update${id}`,
            method: "PATCH",
            body: data,
        }),
        }),
        deleteUser: builder.mutation({
        query: (id) => ({
            url: `/users/${id}`,
            method: "DELETE",
        }),
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersAPI;