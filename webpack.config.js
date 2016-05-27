var webpack = require('webpack');
var path    = require('path');

// Service worker configuration
module.exports.serviceWorker = {
    debug: false,
    entry: './src/sw.js',
    output: output = {
        path: __dirname,
        filename: 'sw.js'
    },
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
}

// Main script configuration
var entry = './src/app/main.js',
    output = {
        path: __dirname,
        filename: 'main.js'
    },
    resolve = {
      root: [
        path.resolve('./src/app')
      ]
    },
    uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false
        },
        output: {
            comments: false
        }
    });

module.exports.development = {
    debug : true,
    devtool : 'eval',
    entry: entry,
    output: output,
    resolve: resolve,
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    }
};

module.exports.production = {
    debug: false,
    entry: entry,
    output: output,
    resolve: resolve,
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    plugins: [
        uglifyJsPlugin
    ]
};
