var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var optimize = webpack.optimize;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyJsPlugin    = new optimize.UglifyJsPlugin({compress: {warnings: false}});

var basePath = {
    src: 'application/static/src',
    dist: 'application/static/dist'
}

var config = {
    devtool: 'source-map',
    entry: {
        app: [
            path.resolve(__dirname, basePath.src + '/app.js')
        ]
    },
    output: {
        path: basePath.dist,
        filename: 'app.js'
    },
    plugins: [
        // new optimize.CommonsChunkPlugin(basePath.dist + '/app/app.js'),
        new ExtractTextPlugin(basePath.dist + '/app.css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
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
                loader: 'html'
            },
        ]
    }
}

module.exports = config;
