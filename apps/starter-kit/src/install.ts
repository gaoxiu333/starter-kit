#!/usr/bin/env node

/* 安装一些配置 */

import prompts from "prompts";
import spawn from "cross-spawn";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const cwd = process.cwd();

const ESLINT_PKG = [
  {
    name: "eslint",
    args: [],
  },
  {
    name: "prettier",
    args: [],
  },
  {
    name: "eslint-plugin-prettier",
    args: [],
  },
  {
    name: "eslint-config-prettier",
    args: [],
  },
  {
    name: "husky",
    args: [],
  },
  {
    name: "lint-staged",
    args: [],
  },
];

const TS_PKG = [
  {
    name: "typescript",
    args: [],
  },
];

const MOD = {};

async function init() {
  const mod = await chooseMod();
  const pkgManage = await choosePkgManage();
  install(pkgManage);
  initConfig();
  initGitHooks();
}
async function install(pkgManager: string) {
  const allCommand = ESLINT_PKG.map(Object.values).flat(2);
  const args = ["add", "--save", "--save-exact", "--loglevel", "error"];
  spawn.sync(pkgManager, [...args, ...allCommand], { stdio: "inherit" });
}
init();
// 选择包管理器
async function choosePkgManage() {
  const response = await prompts({
    type: "select",
    name: "pkgManage",
    message: "请选择一个包管理器",
    choices: [
      {
        title: "pnpm",
        value: "pnpm",
      },
      {
        title: "yarn",
        value: "yarn",
      },
      {
        title: "npm",
        value: "npm",
      },
    ],
  });
  return response.pkgManage;
}

async function chooseMod() {
  const response = await prompts({
    type: "select",
    name: "mod",
    message: "选择你初始化的包",
    choices: [
      {
        title: "Eslint+Prettier+Husky",
        value: "eslint",
        description: "安装Eslint+Prettier+Husky，并且初始化配置。",
      },
      {
        title: "Typescript",
        value: "typescript",
        description: "初始化Typescript",
      },
    ],
  });
  return response.mod;
}

// 写入配置
async function initConfig() {
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../..",
    "template"
  );
  const files = await fs.readdir(templateDir);

  for (const file of files) {
    fs.copyFile(path.join(templateDir, file), path.join(cwd, file));
  }
}
// 配置 git hooks
async function initGitHooks() {
  const huskyPath = path.join(cwd, ".husky", "pre-commit");
  const dirname = path.dirname(huskyPath);
  try {
    await fs.access(dirname, fs.constants.F_OK);
  } catch (error) {
    fs.mkdir(dirname);
  }

  fs.writeFile(huskyPath, "npx lint-staged");
}
