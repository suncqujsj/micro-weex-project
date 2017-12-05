var path = require('path')
var webpack = require('webpack')
var copy = require('copy-webpack-plugin');

/*var bannerPlugin = new webpack.BannerPlugin(
  '// { "framework": "Vue" }\n',
  { raw: true }
)*/

var bannerPlugin =new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
  })
//  文件拷贝插件,将图片和字体拷贝到dist目录
var copyPlugin = new copy([
    {from: './src/img', to: "./img"}
])

var entry = {
  'vue-bundle': path.resolve('src', 'entry.js')
}

var nativeConfig = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].weex.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        loaders: ['weex-loader']
      }
    ]
  },
  plugins: [bannerPlugin,copyPlugin]
}


var webConfig = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].web.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        loaders: ['vue-loader']
      }
    ]
  }
}

module.exports = [nativeConfig, webConfig]
