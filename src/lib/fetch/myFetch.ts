import { refresh } from "@/services/auth.service";
import createFetch, { type HandleRefresh } from "./createFetch";

export const API_URL = import.meta.env.VITE_API_URL!;

const handleRefresh: HandleRefresh = async () => {
   const { error } = await refresh();
   // if (data && Notification.permission === 'default' || Notification.permission === 'denied') {
   //    requestNotification()
   //       .then((token) => {
   //          updateFcmToken({
   //             fcmToken: token,
   //          });
   //       })
   //       .catch((error) => {
   //          console.warn(error);
   //       });
   // }

   if (error) {
      // deleteToken(getMessaging())
      throw error;
   }
};

const myFetch = createFetch({
   baseUrl: API_URL,
   handleRefresh,
});

export default myFetch;
