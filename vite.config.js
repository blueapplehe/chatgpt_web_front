import vue from '@vitejs/plugin-vue'

export default {
  base: './',
  plugins: [vue()],
  optimizeDeps: {
      include: ['schart.js']
  },
  server:{
      port: 3003,
      host: "0.0.0.0",
      open: true,
      https: false,
      watch:{usePolling: true},
      proxy: {
        // with options
        '/api': {
          target: 'http://127.0.0.1:9005',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
  }

}
