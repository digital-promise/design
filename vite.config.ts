/// <reference types="vitest" />
/// <reference types="vite/client" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/testing.ts"],
    },
    plugins: [react()],
    publicDir: false,
    build: {
      cssCodeSplit: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: [
          resolve(__dirname, "src/index.ts"),
          resolve(__dirname, "src/main.css"),
        ],
        name: "components",
        // the proper extensions will be added
        fileName: "index",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss",
          },
        },
      },
    },
  };
});
