/// <reference types="vitest" />
/// <reference types="vite/client" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "unplugin-dts/vite";
import directives from "rollup-preserve-directives";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isStorybookBuild =
    command === "serve" || process.env.STORYBOOK === "true";

  const alwaysRequiredPlugins = [react()];
  const requiredForDistPlugins = [dts({ bundleTypes: true }), directives()];

  const plugins = isStorybookBuild
    ? alwaysRequiredPlugins
    : alwaysRequiredPlugins.concat(requiredForDistPlugins);

  return {
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/testing.ts"],
    },
    plugins,
    resolve: {
      alias: isStorybookBuild
        ? {
            "next/link": resolve(__dirname, "src/shims/next-link.tsx"),
            "next/navigation": resolve(
              __dirname,
              "src/shims/next-navigation.ts",
            ),
          }
        : {},
    },
    publicDir: false,
    build: {
      emptyOutDir: false,
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
