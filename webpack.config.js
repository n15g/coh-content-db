const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry: {
        'coh-content-db': './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'coh-content-db',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'inline-source-map',
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader'
            },
            {
                test: /\.(jpe?g|png|)(\?[a-z0-9=&.]+)?$/,
                use: 'base64-inline-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new UnminifiedWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
};
