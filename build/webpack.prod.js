/**
 * Created by v_liukai01 on 2019/7/29.
 */
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge({
    mode: 'production',
    output: {
        filename: 'js/[name]_[contenthash].js',  // 入口和内容hash组成的文件名，也可以是hash
        chunkFilename: 'js/[name]_[contenthash].chunk.js'
    }
}, base)
