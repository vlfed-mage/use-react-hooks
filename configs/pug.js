const HtmlPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('beautify-html-webpack-plugin');
const glob = require('glob');
const PATH = require('path');

const { isDev } = require('../helpers/env');
const routes = require('./routes');

const generateHtmlPlugins = () => {
    return glob.sync(PATH.resolve(routes.html, '*.pug')).map(item => {
        const extension = PATH.extname(item)
        const name = PATH.basename(item, extension)

        return new HtmlPlugin({
            filename: `${name}.html`,
            template: PATH.resolve(routes.html, item),
            inject: true,
            minify: false,
        });
    });
};

module.exports.generateHtmlPlugins = generateHtmlPlugins;
module.exports.beautifyHtml = new HtmlBeautifyPlugin({
    config: {
        html: {
            indent_size: 4,
            end_with_newline: true,
            indent_with_tabs: true,
            indent_inner_html: true,
            preserve_newlines: true,
        }
    },
});

module.exports.loader = {
    test: /\.pug$/,
    exclude: /[\\/]node_modules[\\/]/,
    use: [
        {
            loader: 'html-loader',
            options: {
                minimize: {
                    removeComments: !isDev,
                    collapseWhitespace: true,
                },
            },
        },
        'pug-html-loader'
    ],
};
