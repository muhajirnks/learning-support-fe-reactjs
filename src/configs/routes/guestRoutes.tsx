import type { RouteObject } from "react-router-dom";

const guestRoutes: RouteObject[] = [
   {
      path: "/login",
      lazy: async () => ({
         Component: (await import("@/pages/Auth/Login")).default,
      }),
   },
   {
      path: "/register",
      lazy: async () => ({
         Component: (await import("@/pages/Auth/Register")).default,
      }),
   },
   {
      path: "/forgot-password",
      lazy: async () => ({
         Component: (await import("@/pages/Auth/ForgotPassword")).default,
      }),
   },
   {
      path: "/reset-password",
      lazy: async () => ({
         Component: (await import("@/pages/Auth/ResetPassword")).default,
      }),
   },
];

export default guestRoutes;
