const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader']
      }]  
    },
    devtool: 'inline-source-map',
    devServer: {
      open: true,
      port: 3000,
    },
    node: {
      fs: 'empty'
    }
};