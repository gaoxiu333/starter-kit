import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";

export default [
  {
    name: "node",
    plugins: {
      node: nodePlugin,
    },
    rules: {
      "node/handle-callback-err": ["error", "^(err|error)$"],
      "node/no-deprecated-api": "error",
      "node/no-exports-assign": "error",
      "node/no-new-require": "error",
      "node/no-path-concat": "error",
      "node/prefer-global/buffer": ["error", "never"],
      "node/prefer-global/process": ["error", "never"],
      "node/process-exit-as-throw": "error",
    },
  },
];