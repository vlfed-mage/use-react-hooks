const TerserWebpackPlugin = require('terser-webpack-plugin');

const { isDev } = require('../helpers/env');

module.exports.minify = new TerserWebpackPlugin({

    // https://webpack.js.org/plugins/terser-webpack-plugin/
    // https://github.com/terser/terser#minify-options-structure

    exclude: /[\\/]node_modules[\\/]/,
    terserOptions: {
        parse: {
            // Let terser parse ecma 8 code but always output
            // ES5 compliant code for older browsers
            ecma: 8
        },
        compress: {
            ecma: 5,
            warnings: false,
            comparisons: false
        },
        mangle: {
            safari10: true
        },
        output: {
            ecma: 5,
            comments: false,
            ascii_only: true
        },
    },
});

module.exports.loader = {
    test: /\.js$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: [
        {
            loader: 'babel-loader',
            options: isDev ? {} : { cacheDirectory: true }
        }
    ]
};
