import type { RouteObject } from "react-router-dom";

const authRoutes: RouteObject[] = [
   {
      lazy: async () => ({
         Component: (await import("@/layouts/MainLayout")).default,
      }),
      children: [
         {
            index: true,
            lazy: async () => ({
               Component: (await import("@/pages/Dashboard")).default,
            }),
         },
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
