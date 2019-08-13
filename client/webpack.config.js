const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack"); //to access built-in plugins
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [{ test: /\.js$/, exclude: "/node_modules/", use: "babel-loader" }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "draw",
      template: "./src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
