"use strict";

const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra')
//const pkg = require('./package.json');
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(['dist'], {
    verbose: true
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    },
    'global': '{}'
  }),
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
  }),
  new CopyWebpackPlugin([
    {from: './src/img', to: "./src/img"}
  ])
  /*,
  new CopyWebpackPlugin([
    {from: './src/T0xAC/img', to: "./src/T0xAC/img"}
  ])*/
];

console.log('Building..., Please wait a moment.');

/*const getEntry = dir => {
  const entryFiles = glob.sync(`./src/${dir}/*.js`, {});
  var entries = {};
  for (var i = 0; i < entryFiles.length; i++) {
      var filePath = entryFiles[i];
      //console.log(filePath);
      //var filename = filePath.split('${dir}/')[1];
      var filename = filePath.substr(0, filePath.lastIndexOf('.'));
      console.log(filePath);
      entries[filename] = filePath;
  }
  return entries;
};*/
var pluginObj={};
var entry={
  'index': './src/entry.js'
};
//默认编译T0x开关的文件,目标文件如需要编译可添加到includeFiles
var includeFiles=['sample','midea-sample'];
function walk() {
  let directory = path.join(__dirname, './src')
  fs.readdirSync(directory)
    .forEach(file => {
      var fileStr=includeFiles.join(",")+",";
      if(file.indexOf("T0x")!=-1 || fileStr.indexOf(file+",")!=-1){
        runWalk(file)
      }
  })
}
function runWalk(dir){
   dir=dir||".";
   let directory = path.join(__dirname, './src', dir)
   fs.readdirSync(directory)
    .forEach(file => {
      let fullpath = path.join(directory, file)
      let stat = fs.statSync(fullpath)
      let extname = path.extname(fullpath)
      if (stat.isFile() && extname === '.js') {
        let entryFile = path.join(directory, path.basename(file, extname) + '.js')
        //console.log(entryFile);
        let name = path.join(dir, path.basename(file, extname))
        //console.log(name+"@@");
        entry[name] = entryFile;
      } else if (stat.isDirectory()) {
        let subdir = path.join(dir, file)
        runWalk(subdir)
      }
   })
}
walk()
//const sample = getEntry('T0xB1');
//const mideaSample = getEntry('midea-sample');
//const device = getEntry('device');
//const AC = getEntry('T0xAC');
/* entry = Object.assign({
  'index': './src/entry.js'
});*/

const getBaseConfig = () => (
  {
  //devtool: '#source-map',
  entry,
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist')
   /* publicPath: '/',
    filename: 'aa/[name].js'
    libraryTarget: 'umd',
    library: `npm/${pkg.name}/[name]`,
    umdNamedDefine: false*/
  },
  stats: {
    colors: true,
    modules: false,
    reasons: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      }
    }, {
      test: /\.vue(\?[^?]+)?$/,
      use: []
    }]
  },
  plugins,
  devServer: {
    inline: true,
    hot: true,
    headers: {
      "Cache-Control": "no-cache"
    }
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules'
    ]
  }
});

const webCfg = getBaseConfig();
webCfg.output.filename = '[name].web.js';
webCfg.module.rules[1].use.push({
  loader: 'vue-loader',
  options: {
    compilerModules: [
      {
        postTransformNode: el => {
          el.staticStyle = `$processStyle(${el.staticStyle})`
          el.styleBinding = `$processStyle(${el.styleBinding})`
        }
      }
    ]
  }
});

const nativeCfg = getBaseConfig();
nativeCfg.output.filename = '[name].js';
nativeCfg.module.rules[1].use.push('weex-loader');

const exportConfig = [
  //webCfg,
  nativeCfg
];

module.exports = exportConfig;
