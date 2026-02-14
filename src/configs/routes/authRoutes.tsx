import RoleMiddleware from "@/middleware/RoleMiddleware";
import type { RouteObject } from "react-router-dom";

const authRoutes: RouteObject[] = [
   {
      lazy: async () => ({
         Component: (await import("@/layouts/AdminLayout")).default,
      }),
      children: [
         {
            element: <RoleMiddleware allowedRoles={["admin"]} />,
            children: [
               {
                  path: "/admin/dashboard",
                  lazy: async () => ({
                     Component: (await import("@/pages/Admin/Dashboard"))
                        .default,
                  }),
               },
               {
                  path: "/admin/courses",
                  lazy: async () => ({
                     Component: (await import("@/pages/Admin/Course")).default,
                  }),
               },
               {
                  path: "/admin/categories",
                  lazy: async () => ({
                     Component: (await import("@/pages/Admin/Category"))
                        .default,
                  }),
               },
               {
                  path: "/admin/transactions",
                  lazy: async () => ({
                     Component: (await import("@/pages/Admin/Transaction")).default,
                  }),
               },
            ],
         },
      ],
   },
   {
      lazy: async () => ({
         Component: (await import("@/layouts/UserLayout")).default,
      }),
      children: [
         {
            element: <RoleMiddleware allowedRoles={["user"]} />,
            children: [
               {
                  path: "/dashboard",
                  lazy: async () => ({
                     Component: (await import("@/pages/User/Dashboard"))
                        .default,
                  }),
               },
               {
                  path: "/transactions",
                  lazy: async () => ({
                     Component: (await import("@/pages/User/Transaction")).default,
                  }),
               },
               {
                  path: "/my-courses",
                  lazy: async () => ({
                     Component: (await import("@/pages/User/MyCourse")).default,
                  }),
               },
            ],
         },
      ],
   },
   {
      lazy: async () => ({
         Component: (await import("@/layouts/DynamicLayout")).default,
      }),
      children: [
         {
            lazy: async () => ({
               Component: (await import("@/layouts/SettingsLayout")).default,
            }),
            children: [
               {
                  path: "/settings/profile",
                  lazy: async () => ({
                     Component: (await import("@/pages/Settings/Profile"))
                        .default,
                  }),
               },
               {
                  path: "/settings/password",
                  lazy: async () => ({
                     Component: (await import("@/pages/Settings/Password"))
                        .default,
                  }),
               },
               {
                  path: "/settings/appearance",
                  lazy: async () => ({
                     Component: (await import("@/pages/Settings/Appearance"))
                        .default,
                  }),
               },
            ],
         },
      ],
   },
];

export default authRoutes;
