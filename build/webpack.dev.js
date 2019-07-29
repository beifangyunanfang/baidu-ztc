/**
 * Created by v_liukai01 on 2019/7/29.
 */
// webpack.dev.js
const base = require('./webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge({
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [  // loader解析的顺序是从下到上，从右到左的顺序
                    'style-loader',  //使用MiniCssExtractPlugin时就不能使用style-loader了
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2   //该方式可以让@import引入的css文件再次执行一边css打包loader
                        }
                    },
                ]
            }
        ]
    }
}, base)
