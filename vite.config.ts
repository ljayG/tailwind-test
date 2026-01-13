import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    open: "/src/views/index.html", // 서버 시작 시 이 경로를 엽니다.
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    minify: false, // 코드 압축 해제 (가독성 유지)
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/views/index.html"),
        iaList: resolve(__dirname, "src/guide/list/ia/index.html"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});