import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    plugins: [
      react(),
      mode === "development" && command === "serve" ? tailwindcss() : false,
    ],
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
