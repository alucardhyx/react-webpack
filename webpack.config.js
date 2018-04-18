const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
    // console.log(path.join(__dirname , "index.html"))


const webpackConfigure = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  entry: {
    app: "/src/main.js"
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
    // 自动解析相关后缀的文件，就是不需要加后缀webpack也能动补全相关的后缀
    extensions: [".js", "jsx"],
    // 别名，用于路径的简写
    // 'bootstrap': resolve('src/assets/js/bootstrap')
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]

    /* Advanced module configuration (click to show) */
  },

  devtool: "#source-map", // enum
  // enhance debugging by adding meta info for the browser devtools source-map
  // most detailed at the expense of build speed.

  // devServer: {
  //     proxy: { // proxy URLs to backend development server
  //         '/api': 'http://localhost:3000'
  //     },
  //     contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
  //     compress: true, // enable gzip compression
  //     historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  //     hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  //     https: false, // true for self-signed, object for cert authority
  //     noInfo: true, // only errors & warns on hot reload
  //     // ...
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //打包后的文件名
      template: path.join(__dirname, "index.html") //要打包文件的路径
    })
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