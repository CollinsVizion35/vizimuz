import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',//'viz.localhost', // Replace with your desired custom name
    port: 3000, // Replace with your desired custom port
  },
  plugins: [react()],
});
