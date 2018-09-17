const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.config");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssConfig = require("./postcss.config");

module.exports = webpackMerge(commonConfig,{
    devtool: "source-map",//比较慢  有行有列   可根据电脑性能进行选择  需要生产环境必须先删 dist 文件 然后打包
    // devtool: "eval-source-map",//快速  有安全性问题 有行有列
    module:{
        rules:[
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:"css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader:"less-loader",
                        options: {
                            sourceMap: true
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: postcssConfig.plugins,
                            sourceMap: true
                        }
                    },
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename:"./css/[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
});
