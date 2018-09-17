const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.config");
const uglify = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssConfig = require("./postcss.config");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
module.exports = webpackMerge(commonConfig,{
    devtool: false,
    optimization: {
        minimizer: [
            new uglify({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
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
        new uglify(),
        new MiniCssExtractPlugin({
            filename:"./css/[name].css",
            chunkFilename:"./css/[id].css"
        }),
        //消除不使用的样式
        new PurifyCssWebpack({
            paths:glob.sync(path.join(__dirname,'../public/html/src/*.vue'))

        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
});
