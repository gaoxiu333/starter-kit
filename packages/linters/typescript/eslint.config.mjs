import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  {
    // 忽略这些文件
    ignores: ["**/build/**", "**/dist/**"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jest: jestPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
    },
  },
  {
    // js 禁用类型检查
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // 测试文件启用 jest
    files: ["test/**"],
    ...jestPlugin.configs["flat/recommended"],
  },
  // 自定义规则
  {
    name: "TypeScript",
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
    },
  },
  {
    name: "TypeScript/dts",
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "no-restricted-syntax": "off",
      "unused-imports/no-unused-vars": "off",
    },
  },
];
