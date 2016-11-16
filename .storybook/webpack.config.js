const path = require('path');
const devConfig = require('../internals/webpack/webpack.dev.babel');

const rootDir = path.resolve('./app');
console.log(`rootDir: ${rootDir}`);
console.log(`resolve:`, devConfig.resolve);

module.exports = {
  devtool: devConfig.devtool,
  cssLoaders: devConfig.cssLoaders,
  plugins: [
    // your custom plugins
  ],
  resolve: Object.assign({}, devConfig.resolve, {root: rootDir}),

  module: {
    loaders: Object.assign([], devConfig.module.loaders),
  },

  postcss: devConfig.postcss
};
