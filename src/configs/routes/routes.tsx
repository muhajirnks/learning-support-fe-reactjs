import Root from "@/layouts/Root";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import GuestMiddleware from "@/middleware/GuestMiddleware";
import ErrorBoundary from "@/pages/Error/ErrorBoundary";
import NotFound from "@/pages/Error/NotFound";
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes";
import guestRoutes from "./guestRoutes";
import publicRoutes from "./publicRoutes";

export const router = createBrowserRouter([
   {
      path: "/",
      Component: Root,
      ErrorBoundary: ErrorBoundary,
      children: [
         {
            Component: GuestMiddleware,
            children: guestRoutes,
         },
         {
            Component: AuthMiddleware,
            children: authRoutes,
         },
         ...publicRoutes,
         {
            path: "*",
            Component: NotFound,
         },
      ],
   },
]);
