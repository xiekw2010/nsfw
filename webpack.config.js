var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var precss = require('precss')
var autoprefixer = require('autoprefixer')

module.exports = {
    target: 'node',
    entry: './index.jsx',
    output: {
        path: './dist',
        filename: 'index.js'
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'nsfw',
            template: 'template.ejs'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `'production'`
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'Tether': 'tether',
            'window.Tether': 'tether'
        }),
        new webpack.optimize.DedupePlugin()
    /*
    new webpack.optimize.UglifyJsPlugin({
              compress: {
                  warnings: false
              }
          })
    */
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }],
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        }]
    },
    postcss: function() {
        return [precss, autoprefixer]
    }
}
