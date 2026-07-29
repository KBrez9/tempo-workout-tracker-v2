import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await writeFile(
  "dist/server/index.js",
  `const html=${JSON.stringify(html)};\nexport default {async fetch(){return new Response(html,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-cache"}})}};\n`,
);
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
