const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const images = require('./configs/images');
const js = require('./configs/js');

const plugins = [images.imageMinPlugin];
plugins.push(new CleanWebpackPlugin());

module.exports = {
    target: 'web',
    performance: {
        maxAssetSize: 500000
    },
    optimization: {
        // minimize: true,
        minimizer: [
            js.minify
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        // runtimeChunk: 'single'
    },
    plugins,
}
