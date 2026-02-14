import useUserStore from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "@/components/Loading";

interface Props {
   allowedRoles: string[];
}

const RoleMiddleware: React.FC<Props> = ({ allowedRoles }) => {
   const { user, loading } = useUserStore();

   if (loading) return <Loading />;

   if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
   }

   return <Outlet />;
};

export default RoleMiddleware;
