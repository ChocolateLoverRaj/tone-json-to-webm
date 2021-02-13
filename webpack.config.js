const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './lib/webpack/index.ts',
  output: {
    path: path.join(__dirname, 'dist/webpack'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
