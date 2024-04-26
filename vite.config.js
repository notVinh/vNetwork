import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   // Đưa ra cấu hình proxy cho các yêu cầu từ backend
    //   "/api": {
    //     target: "https://v-network-api.vercel.app", // URL của backend
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ""),
    //     // cookieDomainRewrite: "localhost", // Sửa lại tên miền cookie nếu cần thiết
    //     cors: true, // Cho phép sử dụng CORS
    //   },
    // },
  },
});
