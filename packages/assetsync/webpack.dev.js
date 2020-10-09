const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    externals: ['fs-extra', 'fs'],
    entry: './example/index.js',
    mode: 'development',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      }]  
    },
    devtool: 'inline-source-map',
    devServer: {
      open: true,
      port: 3500,
    },
    plugins: [
      new HtmlWebpackPlugin()
    ],
    node: {
      module: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'mock',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
};