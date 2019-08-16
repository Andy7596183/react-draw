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
  module: {
    rules: [
      { test: /\.js$/, exclude: "/node_modules/", use: "babel-loader" },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "draw",
      template: "./src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
