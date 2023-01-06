const { isDev } = require('../helpers/env');
module.exports.fileName = `[name]${ isDev ? '.[hash:8]' : '' }.[ext]`;
