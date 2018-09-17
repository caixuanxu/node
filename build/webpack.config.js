const path = require('path');
const htmlPlugin= require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
    entry: {
        entry:  path.join(__dirname, '../public/js/main.js'),//入口
        vendor:["vue","axios","vue-router","lodash"],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
        publicPath: "/",
    },//出口
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    module:{
        rules:[
            {
                test: /\.vue/,
                use: ["vue-loader"]
            },
            {
                test: /\.(jpg|jpeg|svg|png|gif)$/,
                use: [{
                    loader:"url-loader",
                    options: {
                        limit: 300000,
                        outputPath: 'img/',// 指定打包后的图片位置
                        name:'[name].[ext]?[hash]',//name:'[path][name].[ext]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(htm|html)$/i,
                use:['html-withimg-loader']
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:path.resolve(__dirname, "../public/html/index.html"),
        }),
    ]
};
