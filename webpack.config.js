var path = require('path');
var webpack = require('webpack');
var rootPath = path.join(__dirname);
module.exports = {
    context:path.join(rootPath, "src"),
    entry: {
        index:['babel-polyfill',"./js/index"],
        detail:['babel-polyfill', "./js/detail"],
        messages:['babel-polyfill',"./js/messages"],
        users:['babel-polyfill',"./js/users"],
        channels:['babel-polyfill',"./js/channels"],
        signin:['babel-polyfill',"./js/signin"],
    },
    output: {
        path: path.join(rootPath , "public"),
        filename: "[name].bundle.js",
    },
    resolve:{
      root:rootPath
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
              test:/\.css$/,
              loaders:['style','css']
            },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
           {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
           {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
           {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
           {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},

      ]
    },
    plugins: [
       new webpack.ProvidePlugin({
           'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
           'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
       }),
       new webpack.NoErrorsPlugin(),
   ]

};
