var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack           = require('webpack');
var customProperties  = require('postcss-custom-properties');
var autoprefixer      = require('autoprefixer');
var precss            = require('precss');
var postcssImport     = require('postcss-import');
var cssnano           = require('cssnano');

module.exports = {
  entry: {
    homepage: './src/App/App.js'
  },
  output: {
    path: './dist/',
    filename: 'app.js',

    // just for testing in the example page
    library: 'App',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['react', 'es2015', 'stage-0']} },
      { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.woff$/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  },
  // just for testing in the example page
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    }
  },
  postcss: function(webpack) {
    return [
      precss(),
      autoprefixer(),
      customProperties(),
      postcssImport({
        addDependencyTo: webpack
      }),
      cssnano()
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true
    })
  ],
  watch: true
};