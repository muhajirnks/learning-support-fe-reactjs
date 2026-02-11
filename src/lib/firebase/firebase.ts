// Import the functions you need from the SDKs you need
import { type FirebaseApp, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID,
   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inisialisasi Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

/**
 * getMessaging secara aman, hanya di browser.
 */
const getMessaging = () => {
   if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator
   ) {
      const { getMessaging } = require("firebase/messaging");
      return getMessaging(app);
   }

   return null; // fallback saat di SSR
};

export { app, getMessaging };
