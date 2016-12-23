var webpack = require("webpack");
console.log(__dirname + '/public/module')
module.exports = {
    entry: ["./public/app.js"],
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, loader: 'style!css'
            },
            { 
                test: /\.less$/, loader: 'style!css!less' 
            },
            { 
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        root: __dirname + '/public/module',
        alias: {
            'Dao': 'Data/Dao/Dao.js',
            'Manu': 'Data/Manu/Manu.js',
            'Views': 'Views/Views.js',
            'Underscore': 'Others/Underscore/Underscore.js',
            'Showdown': 'Others/Showdown/Showdown.js',
            'Juicer': 'Others/Juicer/Juicer.js',
            'Moment': 'Others/Moment/Moment.js'
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}