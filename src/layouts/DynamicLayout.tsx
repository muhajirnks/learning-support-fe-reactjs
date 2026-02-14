import useUserStore from "@/store/useUserStore";
import MainLayout from "./MainLayout";
import { Outlet } from "react-router-dom";

const DynamicLayout = () => {
   const user = useUserStore((s) => s.user);
   return user?.role == "admin" ? (
      <MainLayout />
   ) : (
      <Outlet />
   );
};

export default DynamicLayout;
