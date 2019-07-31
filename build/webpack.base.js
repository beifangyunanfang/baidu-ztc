/**
 * Created by v_liukai01 on 2019/7/29.
 */
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = path.resolve(__dirname, '../public/index.html');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            // 将es6编译成es5
            // {
            //     test: /\.jsx?$/,   // ?表示x有0个或一个
            //     exclude: /node_modules/,  // 不编译某个目录下的文件
            //     include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
            //     use: [
            //         "babel-loader?cacheDirectory",  // 缓存loader执行结果
            //     ]
            // },
            // 将es6编译成es5
            {
                test: /\.jsx?$/,   // ?表示x有0个或一个
                exclude: /node_modules/,  // 不编译某个目录下的文件
                include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
                use: [
                    "babel-loader"
                ]
            },
            // 加载解析文件资源
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader', // 和file-loader功能相同，但更智能
                    options: {
                        // 配置打包后的文件名,具体可看webpack的file-loader文档
                        name: '[name].[ext]?[hash]',
                        outputPath: 'images/',
                        limit: 4096 // 当图片大小大于4k时将以文件形式输出，否则以base64输出
                    }
                }
            },
            // 引入字体，svg等文件
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }

        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template,
            filename: 'index.html'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            // chunks: 'async', // async表示只对异步代码进行分割
            minSize: 30000,  // 当超过指定大小时做代码分割
            // maxSize: 200000,  // 当大于最大尺寸时对代码进行二次分割
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {  // 缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // 权重越大，打包优先级越高
                    // filename: 'js/vender.js'  //将代码打包成名为vender.js的文件
                    name: 'vender'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'common',
                    // filename: 'js/common.js',
                    reuseExistingChunk: true // 是否复用已经打包过的代码
                }
            }
        },
        usedExports: true
    }
}

