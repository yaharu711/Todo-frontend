import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173, // 必要に応じてポート番号を指定
      watch: { //ホットリロードの設定
        usePolling: true, // ファイル変更のポーリングを使用
        interval: 100 // ポーリングの間隔（ミリ秒）
    }
  }
})
