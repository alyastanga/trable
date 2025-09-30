import { build, context } from "esbuild";

/**
 * @type {import("esbuild").BuildOptions}
 */
const config = {
  entryPoints: ["src/index.ts"],
  outdir: "dist",
};

const args = process.argv.slice(2);
const isDev = args.includes("--dev");

const buildConfigs = [
  {
    ...config,
    platform: "browser",
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
  },
  {
    ...config,
    platform: "node",
    format: "cjs",
    outExtension: {
      ".js": ".cjs",
    },
  },
];

if (isDev) {
  console.log("Running in dev mode (watching for changes)...");
  const contexts = await Promise.all(
    buildConfigs.map((config) => context(config)),
  );
  await Promise.all(contexts.map((ctx) => ctx.watch()));
} else {
  console.log("Building for production");
  for (const config of buildConfigs) {
    await build(config);
  }
}
