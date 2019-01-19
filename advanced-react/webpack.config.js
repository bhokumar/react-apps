const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].min.css');

//const BUILD_DIR = path.resolve(__dirname, 'build');
const BUILD_DIR = path.resolve(__dirname,'./resources/public');
const SRC_DIR = path.resolve(__dirname,'src');


module.exports = (env = {}) =>{

  return {
    entry : {
      index : [SRC_DIR + '/Index.js']
    },
    output : {
      path : BUILD_DIR,
      filename : '[name].bundle.js',
      publicPath : '/'
    },
    devtool : 'inline-source-map',
    devServer : {
      contentBase : BUILD_DIR,
      compress : true,
      hot : true,
      open : true,
      historyApiFallback : true
    },
    module : {
      rules : [
        {
          test : /\.(js|jsx)$/,
          exclude : /node_modules/,
          use : {
            loader : 'babel-loader',
            options : {
              cacheDirectory : true,
              presets : ['react','env']
            }
          }
        },
        {
          test : /\.html$/,
          loader : 'html-loader'
        },
        {
          test : /\.css$/,
          use : extractCSS.extract({
            fallback : 'style-loader',
            use : 'css-loader'
          })
        },
        {
          test : /\.(png|jpg|jpeg|gif|ico)$/,
          use : {
            loader : 'file-loader',
            options : {
              name : './img/[name].[hash].[ext]'
            }
          }
        },
        {
          test : /\.(woff(2)?|ttf|eot|svg)(\?v=\d+.\d+\.\d+)?$/,
          loader : 'file-loader',
          options : {
            name : './fonts/[name].[hash].[ext]'
          }
        }
      ]
    },
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      //new webpack.optimize.UglifyJsPlugin({sourceMap:true}),
      new webpack.NamedModulesPlugin(),
      extractCSS,
      new HtmlWebpackPlugin({
        inject: true,
        template : './public/index.html'
      }),
      new CopyWebpackPlugin([
        {from : './public/img', to : 'img'}
      ],
      {copyUnmodified : false}
      ),
      new webpack.DefinePlugin({
        API_URL_ : `"${env.API_ENV}"`
      })
    ]
  };
};
