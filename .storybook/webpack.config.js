// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');

const rootDir = path.resolve('./app');
console.log(`rootDir: ${rootDir}`);

module.exports = {
  devtool: 'eval',
  plugins: [
    // your custom plugins
  ],
  resolve: {
    root: rootDir,
    modules: ['app', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'jsnext:main',
      'main',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'css', 'postcss'],
        include: /node_modules/
      },
      {
        test: /\.(svg)$/,
        exclude: /(fonts)/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /(images)/,
        loader: 'url?limit=1&name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      }
    ],
  },
};
