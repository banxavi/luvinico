/**
 * Cloudflare Workers CI runs `npm run build` then `npx wrangler deploy`.
 * Wrangler expects OpenNext artifacts (`.open-next/.build/open-next.config.edge.mjs`).
 *
 * OpenNext itself invokes `npm run build` after setting NEXT_PRIVATE_STANDALONE —
 * in that case we must run plain `next build` to avoid recursion.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

spawnSync("node", [path.join(scriptDir, "sync-cms-studio.mjs")], {
  stdio: "inherit",
  shell: true,
});

const fromOpenNext = process.env.NEXT_PRIVATE_STANDALONE === "true";
const args = fromOpenNext
  ? ["next", "build"]
  : ["opennextjs-cloudflare", "build"];

const result = spawnSync("npx", args, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
