/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEBEX_API_URL: string
  readonly VITE_TEBEX_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}