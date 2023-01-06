const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const { isDev } = require('../helpers/env');

module.exports.imageMinPlugin = new ImageMinimizerPlugin({

    // https://web.dev/use-imagemin-to-compress-images/
    // https://webpack.js.org/plugins/image-minimizer-webpack-plugin/

    severityError: 'warning',
    minimizerOptions: {

        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you

        plugins: [
            ['gifsicle', { interlaced: true }],
            ['mozjpeg', { progressive: true}],
            ['pngquant', { quality: [0.45, 0.60], speed: 10}],
        ],
    },
});

module.exports.loader = {
    test: /\.(png|jpe?g|gif|svg)$/,
    exclude: /[\\/]node_modules[\\/]/,
    type: 'asset/resource',
    generator: {
        filename: `[path][name]${ isDev ? '.[hash:8]' : '' }[ext]`,
    },
};
