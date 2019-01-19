const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//const BUILD_DIR = path.resolve(__dirname, 'build');
const BUILD_DIR = path.resolve(__dirname,'dist');
const SRC_DIR = path.resolve(__dirname,'src');

console.log('BUILD_DIR',BUILD_DIR);
console.log('SRC_DIR',SRC_DIR);

module.exports = (env = {}) =>{
    
    console.log(env);
    return {
        entry : {
            index : [SRC_DIR + '/index.js']
        },
        output : {
            path : BUILD_DIR,
            filename : '[name].bundle.js',
            publicPath : './'
        },
        devtool : 'inline-source-map',
        devServer : {
            contentBase : BUILD_DIR,
            compress : true,
            hot : true,
            open : true,
            historyApiFallback : true
        },
        optimization: {
            nodeEnv: 'production',
            minimizer : [
                new UglifyJsPlugin(),
            ]
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
                    test : /(\.css$)/,
                    loaders: ['style-loader', 'css-loader']
                },
                {
                    test : /\.(png|jpg|jpeg|gif|ico)$/,
                    use : {
                        loader : 'file-loader',
                        options : {
                            name : '[name].[hash].[ext]'
                        }
                    }
                },
                {
                    test : /\.md$/,
                    use : {
                        loader : 'file-loader'
                    }
                },
                {
                    test : /\.(woff(2)?|ttf|eot|svg)(\?v=\d+.\d+\.\d+)?$/,
                    loader : 'url-loader?limit=100000'
                }
            ]
        },
        performance: {
          hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
          maxEntrypointSize: 400000, // int (in bytes)
          assetFilter: function(assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
          }
        },

        plugins : [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
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
            _API_URL_ : `"${env.API_ENV}"`
        })
        ]
    }
};