// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  Messaging,
} from "firebase/messaging";
// import { getMessaging as getMessagingForSW } from "firebase/messaging/sw";
// import { getMessaging } from "firebase/messaging/sw";
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
  measurementId: import.meta.env.VITE_FIREBASE_MESUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// messagingの型を明確に定義
let messaging: Messaging | null = null;

// messagingの初期化関数
const initializeMessaging = async (): Promise<void> => {
  if (await isSupported()) {
    messaging = getMessaging(app);
  } else {
    console.warn("このブラウザではFCMはサポートされていません。");
  }
};

// FCMトークンを取得する関数
const getFCMToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.warn("FCMがサポートされていないか、まだ初期化されていません。");
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY as string,
    });
    return token;
  } catch (error) {
    console.error("FCMトークンの取得に失敗:", error);
    throw error;
  }
};
initializeMessaging();

export { app, messaging, getFCMToken };
