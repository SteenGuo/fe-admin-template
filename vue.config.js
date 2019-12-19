module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false,
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
  },
  devServer: {
    proxy: "http://172.102.130.56:8080"
  },
};
