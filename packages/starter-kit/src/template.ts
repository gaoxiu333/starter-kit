#!/usr/bin/env node
import prompts from "prompts";
import minimist from "minimist";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const cwd = process.cwd();

// 获取命令行参数
const argv = minimist(process.argv.slice(2));

const FORMEWORKS = [
  {
    name: "react-tailwindcss",
    args: [],
  },
  {
    name: "react-antd",
    args: [],
  },
  {
    name: "nodejs",
    args: [],
  },
  {
    name: "vue3",
    args: [],
  },
  {
    name: "lib",
    args: [],
  },
];
async function run() {
  let targetName = "my-project";

  const { name, framework, overwrite } = await prompts([
    {
      type: "text",
      name: "name",
      message: "请输入项目名称",
      initial: targetName,
      onState: (state) => {
        targetName = state.value;
      },
    },
    {
      type: () =>
        !fs.existsSync(targetName) || isEmpty(targetName) ? null : "select",
      name: "overwrite",
      message: () =>
        (targetName === "."
          ? "Current directory"
          : `Target directory "${targetName}"`) +
        ` is not empty. Please choose how to proceed:`,
      initial: 0,
      choices: [
        {
          title: `覆盖当前目录：${targetName}`,
          value: "yes",
        },
        {
          title: "取消操作",
          value: "no",
        },
        {
          title: "忽略并继续（。。。）",
          value: "ignore",
        },
      ],
    },
    {
      type: "select",
      name: "framework",
      message: "请选择模版",
      choices: [
        {
          title: "react-tailwindcss",
          value: "react-tailwindcss",
          description: "React + TailwindCSS",
        },
        {
          title: "react-antd",
          value: "react-antd",
          description: "React + Antd",
        },
        {
          title: "nodejs",
          value: "nodejs",
          description: "Nodejs",
        },
        {
          title: "vue3",
          value: "vue3",
          description: "Vue3",
        },
        {
          title: "lib",
          value: "lib",
          description: "lib",
        },
      ],
    },
  ]);

  const targetDir = path.resolve(cwd, targetName);
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../",
    `template-${framework}`
  );
  const templateFiles = fs.readdirSync(templateDir);
  // 创建项目文件夹
  if (overwrite === "yes") {
    emptyDir(targetDir);
  } else if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const templateFile of templateFiles) {
    if (templateFile === "package.json") {
      const pkgJson = fs.readFileSync(
        path.join(templateDir, `package.json`),
        "utf-8"
      );
      fs.writeFileSync(
        path.join(targetDir, `package.json`),
        upPkgJson(pkgJson, "name", targetName),
        "utf-8"
      );
      continue;
    }
    const targetPath = path.join(targetDir, templateFile);
    const templatePath = path.join(templateDir, templateFile);
    copy(templatePath, targetPath);
  }
}
function copy(src: string, target: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      const srcFile = path.resolve(src, file);
      const targetFile = path.resolve(target, file);
      copy(srcFile, targetFile);
    }
  } else {
    fs.copyFileSync(src, target);
  }
}

function upPkgJson(pkgJson: string, key: string, data: string | object) {
  const pkg = JSON.parse(pkgJson);
  pkg[key] = typeof data === "object" ? Object.assign(pkg[key], data) : data;
  return JSON.stringify(pkg, null, 2) + "\n";
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export { run };
