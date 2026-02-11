import useUserStore from "@/store/useUserStore";
import { Fragment } from "react";
import Loading from "@/components/Loading";
import { Navigate, Outlet } from "react-router-dom";

const GuestMiddleware = () => {
   const { user, loading } = useUserStore();

   return loading ? (
      <Loading />
   ) : user ? (
      <Navigate to={"/"} />
   ) : (
      <Fragment>
         <Outlet />
      </Fragment>
   );
};

export default GuestMiddleware;
