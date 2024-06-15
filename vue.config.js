const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('geojson')
      .test(/\.geojson$/)
      .use('json-loader')
      .loader('json-loader') // 或者 'file-loader'
      .end();

    // config.module
    //   .rule('xlsx')
    //   .test(/\.(xlsx|xls)$/)
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: '[name].[ext]',
    //     outputPath: 'assets/' // 可以根据需要修改输出路径
    //   })
    //   .end();
  }
});
