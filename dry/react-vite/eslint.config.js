import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx", "**/*.jsx"],
    ...reactRecommended,
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": hooksPlugin,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
      ...hooksPlugin.configs.recommended.rules,
    },
  },
];
