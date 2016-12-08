const path = require('path');
const devConfig = require('../internals/webpack/webpack.dev.babel');

const rootDir = path.resolve('./app');
const resolve = Object.assign({}, devConfig.resolve, { root: rootDir });
const loaders = Object.assign([], devConfig.module.loaders);
const config = {
  devtool: devConfig.devtool,
  cssLoaders: devConfig.cssLoaders,
  plugins: [
    // your custom plugins
  ],
  resolve,

  module: {
    loaders,
  },

  postcss: devConfig.postcss
};

console.log(`rootDir: ${rootDir}`);
console.log(`resolve:`, devConfig.resolve);

module.exports = config;
