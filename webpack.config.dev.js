const HtmlPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin}=require("clean-webpack-plugin")
const miniCssExtractPlugin=require("mini-css-extract-plugin")
const path=require("path")
module.exports={
  mode:"development",
  entry:"./src/index.js",
  output:{
    path:path.resolve(__dirname,'devlopment_ready'),
    filename:"index.[contenthash].js",
    publicPath:"",
  },
  devServer:{
    port:1235,
    static:"./development_ready",
    devMiddleware:{
      index:"index.html",
      writeToDisk:true
    }
  },
  module:{
    rules:[
      {
        test:/\.(jsx|js)$/,
        exclude:path.resolve(__dirname,"node_modules"),
        use:[
          {
            loader:"babel-loader",
            options:{
              presets:["@babel/preset-env","@babel/preset-react"]
            }
          },
          
        ]
      }
      ,{
        test:/\.(scss)$/,
        use:[miniCssExtractPlugin.loader,'css-loader','sass-loader']
      },
      {
        test:/\.(png|jpg)$/,
        type:"asset",
        parser:{
          defaultUrlCondition:{
            maxSize:3*1024
          }
        }
    },
    {
      test:/\.(svg)$/,
      type:"asset/inline"
    }
    ]
  },
  plugins:[
    new HtmlPlugin({
      filename:"index.html",
      template:"./src/index.html"
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:[path.resolve(__dirname,"devlopment_ready")]
    }),
    new miniCssExtractPlugin({
      filename:"[name].[contenthash].css"
    })
  ]
}