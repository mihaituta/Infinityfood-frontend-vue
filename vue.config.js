const fs = require('fs')

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        //target: 'http://localhost:8080', // Points to your Spring Boot backend
        target: ' https://infinityfood-api-springboot.onrender.com', // Points to your Spring Boot backend
        // pathRewrite: { '^/api': '' },
        changeOrigin: true, // Adjusts the origin to match the target URL
        secure: false,
      },
    },
  },
}
