import { baseUrlApi } from "../../api/baseUrlApi";


const authApi = baseUrlApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    // signIn
    signIn: build.mutation({
      query: (signInUserData) => ({
        url: "/auth/login",
        method: "POST",
        body: signInUserData,
      }),
    }),

    // forgetPassword
    forgetPassword: build.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    // make admin
    makeAdmin: build.mutation({
      query: (email) => ({
        url: `/users/make-admin/${email}`,
        method: "PATCH",
      }),
    }),

    // forgetPassword
    resetPassword: build.mutation({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),

    // GET Current User
    getCurrentUser: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
// Update Contact Info
    updateContactInfo: build.mutation({
      query: (contactInfo) => ({
        url: "/users/contact-info",
        method: "PATCH",
        body: contactInfo,
      }),
    }),





    // changePassword
    changePassword: build.mutation({
      query: (changePasswordData) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: changePasswordData,
      }),
    }),
  }),
});

export const {
  useUpdateContactInfoMutation,
  useMakeAdminMutation,
  useSignUpMutation,
  useSignInMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery
} = authApi;
