const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { isDev } = require('../helpers/env');
const { fileName } = require('../helpers/file');

module.exports.cssExtractPlugin = new MiniCssExtractPlugin({
    filename: `css/${ fileName.replace('[ext]', 'css') }`
});

module.exports.loader = {
    test: /\.scss$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: [
        'style-loader',
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: false,
                publicPath: isDev ? '/' : '../',
            },
        },
        {
            loader: 'css-loader',
            options: { sourceMap: true }
        },
        'resolve-url-loader',
        {
            loader: 'postcss-loader',
            options: { sourceMap: true }
        },
        {
            loader: 'sass-loader',
            options: { sourceMap: true }
        }
    ]
};
