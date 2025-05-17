/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly GEMINI_API?: string;
  readonly VITE_STABILITY_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 