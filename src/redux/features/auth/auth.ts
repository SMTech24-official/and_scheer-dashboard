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
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery
} = authApi;
