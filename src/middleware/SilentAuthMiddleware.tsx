import useUserStore from "@/store/useUserStore";
import { getProfile } from "@/services/auth.service";
import { useEffect } from "react";

const SilentAuthMiddleware = () => {
   const { setUser, user, setLoading } = useUserStore();

   const checkLogin = async () => {
      setLoading(true);

      const { data } = await getProfile();
      if (data?.data) {
         setUser(data.data);
      }

      setLoading(false);
   };

   useEffect(() => {
      if (!user) {
         checkLogin();
      }
   }, [user]);

   return <></>;
};

export default SilentAuthMiddleware;
