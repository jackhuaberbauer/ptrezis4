const path = require("path");
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: path.join(__dirname, "client", "app.js"),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
        sourceMapFilename: "./[name].js.map",
        publicPath: "/"
    }, 
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({
          filename: '[file].map[query]'
        }),
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    watch: true
    
};