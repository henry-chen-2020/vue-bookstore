module.exports = {
  devServer: {
    proxy: 'http://localhost:51946'
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}