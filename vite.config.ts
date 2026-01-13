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
});