/// <reference types="vitest" />
/// <reference types="vite/client" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "unplugin-dts/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const useNextNavigationShim =
    command === "serve" || process.env.STORYBOOK === "true";

  return {
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/testing.ts"],
    },
    plugins: [react(), dts({bundleTypes: true})],
    resolve: {
      alias: useNextNavigationShim
        ? {
            "next/navigation": resolve(
              __dirname,
              "src/shims/next-navigation.ts",
            ),
          }
        : {},
    },
    publicDir: false,
    build: {
      cssCodeSplit: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: {
          theme: resolve(__dirname, "src/main.css"),
          index: resolve(__dirname, "src/components/index.ts"),
          forms: resolve(__dirname, "src/components/forms/index.ts"),
        },
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "tailwindcss",
          /^next(?:\/.*)?$/,
        ],
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
