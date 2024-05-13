import globals from "globals";
import js from "@eslint/js";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
/**
 * 配置包含
 * 1. browser 全局变量
 * 2. es2021 全局变量
 * 3. node 全局变量
 * 4. 支持 JSX
 * 5. 仅支持 ESM
 */
/** @type {import('eslint').Linter.Config} */
export default [
  {
    name: "JavaScript",
    languageOptions: {
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
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // 指示是否以及如何跟踪和报告未使用的禁用和启用指令
    },
    plugins: {
      unusedImports: eslintPluginUnusedImports, // 查找并删除未使用的 es6 模块导入
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
