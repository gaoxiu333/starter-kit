// import globals from "globals";
import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    ...react.configs.recommended,
  },
];
