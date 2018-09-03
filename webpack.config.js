"use strict";

const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra')
//const pkg = require('./package.json');
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const argv = require('yargs').argv;

var defaultCleanFolder = ['dist']
if (argv.env) {
    defaultCleanFolder = ['dist/'+argv.env]
}
const plugins = [
    new CleanWebpackPlugin(defaultCleanFolder, {
        verbose: true
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production"),
            BUILD_TIME: JSON.stringify(new Date())
        },
        'global': '{}'
    }),
    new webpack.BannerPlugin({
        banner: '// { "framework": "Vue" }\n',
        raw: true
    }),
    new CopyWebpackPlugin([
        { from: './src/img', to: "./img" }
    ])
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
var pluginObj = {};
var subProjectAssets = []
var commonImagePath = path.join(__dirname, './src/img')
const entryPath = path.resolve(__dirname, './entry/')
var entry = {
    'index': './src/entry.js',
    'weex': './src/weex-entry.js'
};
const FILE_TYPE = '.vue'
const getEntryFileContent = path => {
    return `// 自动生成的入口文件
import App from '${path}${FILE_TYPE}'
new Vue({
  el: '#root',
  render: h => h(App)
})
  `
}
//默认编译T0x和midea-开关的文件夹, 目标文件夹如需要编译可添加到includeFiles
var includeFiles = ['midea-demo', 'midea-rooms','midea-card'];
function walk() {
    if (argv.env) {
        runWalk(argv.env)
    } else {
        let directory = path.join(__dirname, './src')
        fs.readdirSync(directory)
        .forEach(file => {
                var fileStr = includeFiles.join(",") + ",";
                if (file.indexOf("T0x") != -1 || fileStr.indexOf(file + ",") != -1) {
                    runWalk(file)
                }
            })
    }
}
function runWalk(dir) {
    console.log(dir);
    dir = dir || ".";
    let directory = path.join(__dirname, './src', dir)
    let distPath = path.join(__dirname, 'dist')
    let hasTargetFile = false
    fs.readdirSync(directory)
        .forEach(file => {
            let fullpath = path.join(directory, file)
            let stat = fs.statSync(fullpath)
            let extname = path.extname(fullpath)
            if (stat.isFile() && extname === FILE_TYPE) {
                let targetDir = dir
                if (dir.indexOf("midea-card")==0){
                    targetDir = dir + '/midea-card'
                }
                let name = path.join(targetDir, path.basename(file, extname))
                let entryFile = path.resolve(entryPath, name + '.js')
                console.log((path.resolve(entryPath, name + '.js')) + "@@" + directory + "@@"  + name);
                fs.outputFileSync(path.resolve(entryPath, name + '.js'), getEntryFileContent('@/' + dir.replace('\\', '/') + '/' + path.basename(file, extname)))
                entry[name] = entryFile;
                hasTargetFile = true
            } else if (stat.isDirectory()) {
                if (file == "assets") {
                    let targetDir = dir
                    if (dir.indexOf("midea-card")==0){
                        targetDir = dir + '/midea-card'
                    }
                    let targetImgFolder = path.join(distPath, targetDir, "assets")
                    subProjectAssets.push({ from: fullpath, to: targetImgFolder })
                } else if (file !== "components") {
                    let subdir = path.join(dir, file)
                    runWalk(subdir)
                }
            }
        })
    if (hasTargetFile) {
        let targetDir = dir
        if (dir.indexOf("midea-card")==0){
            targetDir = dir + '/midea-card'
        }
        plugins.push(
            new CopyWebpackPlugin([
                { from: commonImagePath, to: path.join(distPath, targetDir, "img") }
            ])
        )
        if (fs.existsSync(path.join(directory, 'weex.html'))) {
            plugins.push(
                new CopyWebpackPlugin([
                    { from: path.join(directory, 'weex.html'), to: path.join(distPath, targetDir) }
                ])
            )
        }
    }
}
walk()

plugins.push(
    new CopyWebpackPlugin(subProjectAssets)
)
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
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader'
                }]
            },
                {test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1000
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
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
            ],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
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
    // webCfg,
    nativeCfg
];

module.exports = exportConfig;
