import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // cho phép vite chạy https
  // server: {
  //   https: {
  //     key: "./key.pem",
  //     cert: "./certificate.pem"
  //   }
  // },
  // import bị lỗi
  resolve: {
    alias: {
      src: "/src"
    }
  }
})
