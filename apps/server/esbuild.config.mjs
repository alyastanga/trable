import { build } from "esbuild";

await build({
  platform: "node",
  format: "cjs",
  outdir: "dist",
  entryPoints: ["src/index.ts"],
  outExtension: {
    ".js": ".cjs",
  },
});
