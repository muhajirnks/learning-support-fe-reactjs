import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { getMessaging } from "@/lib/firebase/firebase";
import useNotificationStore from "../store/useNotificationStore";
// import { getCountUnreadNotif } from "@/services/notif.service";

export const useNotificationListener = () => {
   const { setLatestMessage } = useNotificationStore();

   const countUnread = () => {
      // getCountUnreadNotif().then(({ data }) => {
      //    if (data) {
      //       setCountUnread(data.data.count);
      //    }
      // });
   };

   useEffect(() => {
      const messaging = getMessaging();
      if (!messaging) return;

      // Foreground listener
      const unsubscribe = onMessage(messaging, (payload) => {
         setLatestMessage(payload)
         console.log("📩 Foreground message:", payload);
         countUnread();
      });

      // Background listener via BroadcastChannel
      const bc = new BroadcastChannel("fcm_channel");

      bc.onmessage = (event) => {
         if (event.data?.type === "FCM_RECEIVED") {
            console.log("📡 Background message via SW:", event.data.payload);
            setLatestMessage(event.data.payload)
            countUnread();
         }
      };

      return () => {
         unsubscribe();
         bc.close();
      };
   }, []);
};
