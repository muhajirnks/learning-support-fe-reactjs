"use client";

import { getMessaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const requestNotification = async () => {
   if (typeof window === "undefined" || !("Notification" in window)) {
      throw new Error("Window or Notification is undefined.");
   }

   const permission = await Notification.requestPermission();

   if (permission !== "granted") {
      throw new Error("Permission not granted.");
   }

   const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
   );

   if (!registration) {
      throw new Error("Failed on register service worker.");
   }

   if (!registration.active) {
      console.warn("⌛ Waiting for Service Worker to become active...");
      await new Promise<void>((resolve) => {
         const checkActive = setInterval(() => {
            if (registration.active) {
               clearInterval(checkActive);
               resolve();
            }
         }, 100); // cek setiap 100ms
      });
   }

   const token = await getToken(getMessaging(), {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
   });

   if (!token) {
      throw new Error("Failed on getting token.");
   }

   return token;
};
