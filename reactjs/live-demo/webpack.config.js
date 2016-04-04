var webpack = require('webpack');
const path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _ = require('lodash');

var production = process.env.NODE_ENV === 'production';

const PATHS = {
    app: path.join(__dirname, 'app/'),
    builds: path.join(__dirname, 'builds/')
};

var plugins = [

    new ExtractPlugin(production ? '[name]-[hash].css' : '[name].css', {allChunks: true}), // <=== where should content be piped

    new webpack.optimize.CommonsChunkPlugin({
        name:      ['index1'],
        filename: 'index1-common.js', // Move dependencies to our common file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name:      ['index2'],
        filename: 'index2-common.js', // Move dependencies to our common file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
];


if (production) {
    plugins = plugins.concat([

        // Cleanup the builds/ folder before
        // compiling our final assets
        new CleanPlugin('builds'),

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        // new webpack.optimize.MinChunkSizePlugin({
        //     minChunkSize: 51200, // ~50kb
        // }),  plugin problem: https://github.com/webpack/extract-text-webpack-plugin/issues/115

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}

var createHtmpWebpackPlugin = function (options) {
    return new HtmlWebpackPlugin({
        title: options.title || '首页',
        filename: options.filename,
        template: options.template || './app/template.ejs', // // Load a custom template
        chunks: options.chunks,
        // inject: 'body', // Inject all scripts into the body
        minify: production ? {
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true,
            removeComments: true
        } : false,  // using html-minifier in production evn
        hash: true
    });
};

plugins = plugins.concat([
    createHtmpWebpackPlugin({filename: 'index1.html', chunks: ['index1']}),
    createHtmpWebpackPlugin({filename: 'index2.html', chunks: ['index2']})
]);

module.exports = {
    debug:   !production,
    devtool: production ? false : 'eval',
    entry:  {
        // vendor: _.keys(require(__dirname + '/package.json').dependencies),
        index1 : './app/index1.js',
        index2 : './app/index2.js',
    },
    output: {
        path:     'builds',
        // path:     'builds',
        filename: production ? '[name]-[hash].js' : '[name].js',
        chunkFilename: production ? '[name]-[chunkhash].js' : '[name].js',
        publicPath: 'builds/',
    },
    devServer: {
        hot: true,
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'css', 'scss']
    },
    plugins: plugins,
    module: {
        preLoaders: [
            /*
            {
                test: /\.js/,
                loader: 'eslint',
            }

            {
                test: /\.js/,
                loader: 'baggage?[file].html=template&[file].scss',
            }
            */
        ],
        loaders: [
            {
                test:    /\.(js|jsx)$/,
                loaders:  ['babel-loader', 'eslint-loader'],
                include: PATHS.app,
                exclude: /node_modules/
            },
            {
                test:   /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass'),
            },
            {
                test:   /\.html/,
                loader: 'html',
            },
            {
                test:   /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url',
                query: {
                    limit: 10000,
                }
            },
        ],
    }
};