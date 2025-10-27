import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths"; // install this first.

export default defineConfig({
    plugins: [tsconfigPaths()],
});
