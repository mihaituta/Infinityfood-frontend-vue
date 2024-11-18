const fs = require('fs')

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        //target: 'http://localhost:8080', // Points to your Spring Boot backend
        target: 'https://concrete-leanora-firehive-5ade5b1f.koyeb.app', // Points to your Spring Boot backend
        // pathRewrite: { '^/api': '' },
        changeOrigin: true, // Adjusts the origin to match the target URL
        secure: false,
      },
    },
  },
}
