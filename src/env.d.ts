/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_MISTRAL_API_KEY?: string;
  VITE_GEMINI_API_KEY?: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}