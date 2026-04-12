import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs' // Import the plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCommonjs() // Add it here
  ],
  optimizeDeps: {
    // Keep sheryjs excluded so the plugin can handle it
    exclude: ['sheryjs'],
    esbuildOptions: {
      loader: {
        '.glsl': 'text',
      },
    },
  },
  assetsInclude: ['**/*.glsl']
})