import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "OcnVueComponents",
      fileName: (format) => `ocn-vue-components.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "@vorms/core"],
      output: {
        globals: {
          vue: "Vue",
          "@vorms/core": "Vorms",
        },
      },
    },
  },
});
