// frontend/src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_WS_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_STRIPE_PRICE_ID_PREMIUM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
