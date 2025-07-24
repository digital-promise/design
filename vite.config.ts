import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...tailwindcss(),
      apply: "serve"
    },
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
      name: "DPGDesign",
      // the proper extensions will be added
      fileName: "digitalpromise-design",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react/jsx-runtime"],
    },
  },
});
