import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
import "../dist/css/variables.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
