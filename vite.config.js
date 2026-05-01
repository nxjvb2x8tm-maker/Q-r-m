import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Base path for GitHub Pages deployment at https://<user>.github.io/Q-r-m/
  base: process.env.GITHUB_PAGES === "true" ? "/Q-r-m/" : "/",
  plugins: [react()],
  server: { host: true, port: 5173 },
});
