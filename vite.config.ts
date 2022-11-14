import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), WindiCSS()],
  build: {
    rollupOptions: {
      plugins: [
        copy({
          hook: "writeBundle",
          targets: [
            { src: "./manifest.json", dest: "./dist/" },
            { src: "./DESCRIPTION.md", dest: "./dist/" },
            { src: "./SETUP.md", dest: "./dist/" },
            { src: "./icon.svg", dest: "./dist/" },
            { src: "./docs", dest: "./dist/" },
          ],
        }),
      ],
    },
  },
});
