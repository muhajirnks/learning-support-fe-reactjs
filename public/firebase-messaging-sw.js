importScripts(
   "https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
   "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
   apiKey: "",
   authDomain: "",
   projectId: "",
   storageBucket: "",
   messagingSenderId: "",
   appId: "",
   measurementId: "",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
   // const notificationTitle = payload.notification.title;
   // const notificationOptions = {
   //    body: payload.notification.body,
   //    icon: payload.notification.icon,
   //    data: { url: payload.fcmOptions?.link || "/" },
   // };
   // self.registration.showNotification(notificationTitle, notificationOptions);

   // Kirim event ke tab aktif menggunakan BroadcastChannel
   const bc = new BroadcastChannel("fcm_channel");
   bc.postMessage({ type: "FCM_RECEIVED", payload });

});
