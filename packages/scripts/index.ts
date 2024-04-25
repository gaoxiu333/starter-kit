#!/usr/bin/env ts-node

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const packagesDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const binPath = path.resolve(packagesDir, "quick-lauhch", "bin");

const files = await fs.readdir(packagesDir);
for (const file of files) {
  if (!file.startsWith("template-")) continue;
  const targtePath = path.resolve(binPath, file);
  const templatePath = path.resolve(packagesDir, file);
  copy(templatePath, targtePath);
}

async function copy(src: string, target: string) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(target, { recursive: true });
    for (const file of await fs.readdir(src)) {
      if (file === "node_moduels") continue;
      const srcFile = path.resolve(src, file);
      const targetFile = path.resolve(target, file);
      copy(srcFile, targetFile);
    }
  } else {
    fs.copyFile(src, target);
  }
}
