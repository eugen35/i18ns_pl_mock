const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: '/static/',
    library: "i18ns_pl_mock",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.js']
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  /*
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: __dirname
    }]
  },*/
  watchOptions: {
    aggregateTimeout: 300, // Delay the rebuilt after the first change. Value is a time in ms.
    //poll: true // bool - enable / disable polling or number - polling delay
    poll: 1000
  }
};
