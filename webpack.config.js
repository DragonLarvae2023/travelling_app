const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const terserPlugin= require("terser-webpack-plugin")

const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "devlopment_ready"),
    filename: "index.[contenthash].js",
    publicPath: "",
  },
 
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          defaultUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.(svg)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "public")],
    }),
    new terserPlugin()
  ],
};
