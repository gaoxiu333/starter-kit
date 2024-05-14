import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";

const sharedRules = {
  "n/callback-return": ["error", ["cb", "callback", "next"]],
  "n/handle-callback-err": ["error", "err"],
  "n/prefer-node-protocol": "error",
};

/** 备用配置 */
const cjsConfigs = [
  {
    ...nodePlugin.configs["recommended-script"],
    name: "eslint-node/cjs",
    files: ["**/*.cjs", "**/*.js"],
    rules: {
      ...sharedRules,
      "n/no-mixed-requires": "error",
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
    },
  },
];

const esmConfigs = [
  {
    ...nodePlugin.configs["recommended-module"],
    name: "eslint-node/esm",
    files: ["**/*.mjs", "**/*.js"],
    rules: sharedRules,
  },
];

export default esmConfigs;
