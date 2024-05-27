import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";

export default [
  // { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  // { languageOptions: { globals: globals.browser } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    ...nodePlugin.configs["flat/recommended-module"],
    ignores: ["eslint.config.mjs"],
  },
];
