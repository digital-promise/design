# Digital Promise Design Library

This is a React + Typescript + Tailwind + Vite component library for the development and maintenance of UI components aligned to the [Digital Promise Design System](https://app.gitbook.com/o/B4hdkVOolIXfg1cru4Mb/s/GC8UP51P947pbKSUyr6H/).

## Getting Started

### Installation

[NVM](https://github.com/nvm-sh/nvm) is recommended for the installation and management of Node.js. With NVM installed, you can view and develop components locally following these steps:

- `nvm use` # Install or switch to specific version of Node
- `corepack enable` # Enabling tooling for switching Node package managers
- `corepack use pnpm` # Use the package manager pnpm
- `pnpm install` # Install dependencies
- `pnpm storybook` # Start Storybook

This will install all project dependencies and start a local Storybook server.

### Style Dictionary

Design tokens are defined in the [tokens](./tokens/) directory and exported using [Style Dictionary](https://styledictionary.com/). These design tokens provide the fundamental style definitions for colors and spacing used to generate this component library's [Tailwind CSS](https://tailwindcss.com/) theme. Source and output options are specified in [config.json](./config.json).

### Linting and Testing

Use `pnpm lint` to run static analysis on files in the `src` directory. Use `pnpm test` to run specs defined for components using [Vitest](https://vitest.dev/). See [vite.config.ts](./vite.config.ts) and the [testing setup script](./src/testing.ts) for further information about how those tests are configured to run.