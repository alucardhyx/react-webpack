const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const webpackConfigure = {
  entry: {
    app : path.resolve(__dirname, "src/main.js"),
    vendor: ["react", "react-dom"]
  }, // string | object | array
  // Here the application starts executing and webpack starts bundling

  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files must be an absolute path (use the
    // Node.js path module)

    filename: "[name].[hash:8].js", // string
    // the filename template for entry chunks

    publicPath: "/" // string
    // the url to the output directory resolved relative to the HTML page
  },
  resolve: {
// 解析模块请求的选项 （不适用于对 loader 解析）
    extensions: [".js", ".jsx"],
    // 使用的扩展名
    // 别名，用于路径的简写
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader?compact=false'
          }
        ]
      },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "postcss-loader"}]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            { loader: "css-loader" },
            { loader: "postcss-loader"},
            { loader: "sass-loader" }
          ]
        }
    ]
  },

  devtool : "none",
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  plugins: [
    new CleanWebpackPlugin('./dist'),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", //打包后的文件名
      template: path.join(__dirname, "index.html"), //要打包文件的路径
      inject: true
    }),
    // new DashboardPlugin()
  ],
  // list of additional plugins
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules that does not
    // make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};

module.exports = webpackConfigure