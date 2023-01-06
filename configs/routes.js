const PATH = require('path');

const routes = {
    entry: PATH.resolve(__dirname, '../src/index.js'),
    src: PATH.resolve(__dirname, '../src'),
    build: PATH.resolve(__dirname, '../build'),
    html: PATH.resolve(__dirname, '../src/templates'),
}

module.exports = routes;
