import useUserStore from "@/store/useUserStore";
import { Fragment } from "react";
import Loading from "@/components/Loading";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
   const { user, loading } = useUserStore();

   return loading ? (
      <Loading />
   ) : !user ? (
      <Navigate to={"/login"} />
   ) : (
      <Fragment>
         <Outlet />
      </Fragment>
   );
};

export default AuthMiddleware;
