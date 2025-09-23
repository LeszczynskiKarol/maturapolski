// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    define: {
        // Ensure import.meta.env is available
        "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL || "http://localhost:4000"),
    },
});
