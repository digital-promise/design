import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig, type UserConfig, type PluginOption } from "vite";

const viteReactEntryPlugin = {
  name: "fix-vite-inject-mocker-entry-path",
  enforce: "post",
  transformIndexHtml(html) {
    return html.replace(
      /src="\/vite-inject-mocker-entry\.js"/,
      `src=".\/vite-inject-mocker-entry.js"`
    );
  },
} as const satisfies PluginOption;

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  viteFinal: async (config, { configType }) => {
    const tailwindcss = await import("@tailwindcss/vite");
    const isProductionBuild = configType === "PRODUCTION";
    const storybookOverrides = {
      base: isProductionBuild ? "/design" : undefined,
      plugins: [
        tailwindcss.default(),
        isProductionBuild ? viteReactEntryPlugin : false,
      ],
    } as const satisfies UserConfig;

    return mergeConfig(config, storybookOverrides);
  },
};

export default config;
