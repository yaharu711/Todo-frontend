/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_PROJECT_ID: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_APP_ID: string;
}
interface ImportMetaEnv {
  readonly VITE_FIREBASE_MESUREMENT_ID: string;
}
interface ImportMetaEnv {
  readonly VITE_VAPID_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
