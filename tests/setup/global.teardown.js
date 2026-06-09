// tests/setup/global.teardown.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const statePath = path.join(root, ".api-state.json");

let serverInstance;

// Читаем состояние из файла (если нужно)
function loadState() {
  if (fs.existsSync(statePath)) {
    return JSON.parse(fs.readFileSync(statePath, "utf-8"));
  }
  return null;
}

export default async function globalTeardown() {
  const state = loadState();

  if (state) {
    console.log(`[globalTeardown] Cleaning up, server was at: ${state.apiUrl}`);
  }

  // Очищаем файл состояния
  if (fs.existsSync(statePath)) {
    fs.unlinkSync(statePath);
  }

  console.log("[globalTeardown] Done");
}
