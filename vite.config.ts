import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" => works at https://<user>.github.io/<repo>/ without hardcoding the repo name
export default defineConfig({
  plugins: [react()],
  base: "./",
});
