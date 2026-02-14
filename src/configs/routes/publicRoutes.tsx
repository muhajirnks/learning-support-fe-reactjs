import PublicLayout from "@/layouts/PublicLayout";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import type { RouteObject } from "react-router-dom";

const publicRoutes: RouteObject[] = [
    {
        element: <PublicLayout />,
        children: [
            {
                path: '/',
                lazy: async () => ({
                    Component: (await import("@/pages/Home")).default,
                }),
            },
            {
                path: '/courses',
                lazy: async () => ({
                    Component: (await import("@/pages/Course/List")).default,
                }),
            },
            {
                path: '/courses/:id',
                lazy: async () => ({
                    Component: (await import("@/pages/Course/Detail")).default,
                }),
            },
            {
                Component: AuthMiddleware,
                children: [
                    {
                        path: '/courses/:id/lessons/:lessonId',
                        lazy: async () => ({
                            Component: (await import("@/pages/Course/LessonDetail")).default,
                        }),
                    },
                ]
            }
        ]
    }
];

export default publicRoutes;
