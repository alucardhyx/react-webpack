const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const webpackConfigure = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  // context : __dirname, // string（绝对路径！）
  // webpack 的主目录 entry 和 module.rules.loader 选项 相对于此目录解析
  entry: {
    // app: path.resolve(__dirname, "src/main.js"),
    app: [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://127.0.0.1:3000",
      "webpack/hot/only-dev-server",
      path.resolve(__dirname, "src/main.js")
    ],
    vender: ["react", "react-dom"]
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
    // 'bootstrap': resolve('src/assets/js/bootstrap')
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader?compact=false'
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',options:{ sourceMap: true }},
          { loader: 'postcss-loader', options: { sourceMap: true }},
          { loader: 'sass-loader',options: { sourceMap: true }}
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=12&name=images/[name].[hash:8].[ext]',
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
          }
        ],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  //   splitChunks:{
  //     // 避免过度分割，设置尺寸不小于30kb
  //     //cacheGroups会继承这个值
  //     minSize:30000,
  //     cacheGroups:{
  //         main:{
  //             test: /[\\/]node_modules[\\/]react[\\/]/,
  //             name: './js/main',
  //             chunks:'all'
  //         },
  //         vendors:{
  //             test:/[\\/]node_modules[\\/]?!(react)[\\/]/,
  //             name: './js/vendors',
  //             chunks:'all'
  //         },
  //         extractedJS:{
  //             test:/[\\/]src[\\/].+\.js$/,
  //             name:'./js/extractedJS',
  //             chunks:'all'
  //         }
          
  //     }
  // }
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/api": "http://localhost:3000"
    },
    contentBase: path.join(__dirname, "dist"), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    open: true,
    port: 3000
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor-[hash].min.js'}),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false
    //   }
    // }),
    new CleanWebpackPlugin('./dist'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html", //打包后的文件名
      template: path.join(__dirname, "index.html"), //要打包文件的路径
      inject: true
    }),
    new DashboardPlugin({ port: 3001 })
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