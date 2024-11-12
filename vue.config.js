const fs = require('fs')

module.exports = {
  lintOnSave: false, // Disables linting on save (unrelated to the proxy)
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Points to your Spring Boot backend
        // pathRewrite: { '^/api': '' },
        changeOrigin: true, // Adjusts the origin to match the target URL
        secure: false,
      },
    },
  },
}
