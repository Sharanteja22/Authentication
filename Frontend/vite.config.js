import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Ensure React plugin is used

export default defineConfig({
  plugins: [react()],
});
