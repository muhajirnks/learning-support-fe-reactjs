import useUserStore from "@/store/useUserStore";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

const DynamicLayout = () => {
   const user = useUserStore((s) => s.user);
   return user?.role == "admin" ? (
      <AdminLayout />
   ) : (
      <UserLayout />
   );
};

export default DynamicLayout;
