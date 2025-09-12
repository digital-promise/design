// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  storybook["configs"]["flat/recommended"],
  reactHooks["configs"]["recommended-latest"]
);