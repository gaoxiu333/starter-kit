import globals from "globals";
import js from "@eslint/js";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    name: "JavaScript",
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: "module",
      },
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      unusedImports: eslintPluginUnusedImports,
    },
    // 针对 unused-imports 的配置
    rules: {
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  js.configs.recommended,
];
