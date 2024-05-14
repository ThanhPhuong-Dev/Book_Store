import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '~': '/src' // Sửa thành định dạng object với key là "~" và value là "/src"
    }
  }
});
