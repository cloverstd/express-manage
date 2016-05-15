var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = {
    src: 'application/static/src',
    dist: 'application/static/dist'
}

var config = {
    devtool: '#source-map',
    entry: {
        app: [
            path.resolve(__dirname, basePath.src + '/app.js')
        ],
        vendor: ['angular', 'jquery', 'angular-ui-router', 'angular-ui-bootstrap']
    },
    output: {
        path: basePath.dist,
        filename: 'app.js'
    },
    plugins: [
        // new optimize.CommonsChunkPlugin(basePath.dist + '/app/app.js'),
        new ExtractTextPlugin('app.css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [path.resolve(__dirname, 'node_modules')],
                query: { presets: 'es2015' }
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=' + basePath.dist + '/[name].[ext]'
            },
            {
                test: /\.tpl/,
                loader: 'ngtemplate!html'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
        ]
    }
}

module.exports = config;
