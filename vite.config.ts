import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from "path"


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname , "../../VisionGoalServer/Backend/front") // Change this to your desired output folder
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
});
