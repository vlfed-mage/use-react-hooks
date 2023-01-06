const { fileName } = require('../helpers/file');

module.exports.loader = {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /[\\/]node_modules[\\/]/,
    type: 'asset/resource',
    generator: {
        filename: `[path]${fileName}`,
    },
};
