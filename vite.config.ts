import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.GIF', '**/*.JPEG', '**/*.SVG'],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        'generated-client': path.resolve(__dirname, "./generated-client"),
      },
    },
    define: {
      'process.env.VITE_MISTRAL_API_KEY': env.VITE_MISTRAL_API_KEY,
      'process.env.VITE_GEMINI_API_KEY': env.VITE_GEMINI_API_KEY,
      'process.env.VITE_GIPHY_API_KEY': env.VITE_GIPHY_API_KEY
    }
  }
})