const { merge } = require('webpack-merge');

const routes = require('./configs/routes');
const scss = require('./configs/scss');
const pug = require('./configs/pug');
const images = require('./configs/images');
const fonts = require('./configs/fonts');
const js = require('./configs/js');
const { isDev } = require('./helpers/env');

module.exports = (env) => {
    const plugins = pug.generateHtmlPlugins();
    plugins.push(scss.cssExtractPlugin);
    plugins.push(pug.beautifyHtml);

    const config = {
        mode: env.WEBPACK_SERVE ? 'development' : 'production',
        performance: {
            hints: false,
        },
        entry: routes.entry,
        output: {
            path: routes.build,
            publicPath: isDev ? '/' : ``,
        },
        module: {
            rules: [
                js.loader,
                scss.loader,
                pug.loader,
                images.loader,
                fonts.loader,
            ]
        },
        plugins,
    };

    return merge(
        config,
        isDev ?
            require('./dev.config') :
            require('./build.config')
    );
}
