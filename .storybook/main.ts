import type { StorybookConfig } from "@storybook/react-vite";

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

  viteFinal: (config, { configType }) => {
    /**
     * Workaround for absolute path used in React Vite plugin
     * See: https://github.com/storybookjs/storybook/issues/32428
     */
    if (configType === "PRODUCTION") {
      const basePath = "/design";
      config.base = basePath;

      config.plugins = config.plugins ?? [];
      config.plugins.push({
        name: "fix-vite-inject-mocker-entry-path",
        enforce: "post",
        transformIndexHtml(html) {
          return html.replace(
            /src="\/vite-inject-mocker-entry\.js"/,
            `src=".\/vite-inject-mocker-entry.js"`
          );
        },
      });
    }
    return config;
  },
};
export default config;
