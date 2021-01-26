const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'sass-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/
            }
            /*{
                test: /\.tmpl/,
                loader: 'handlebars-loader',
                exclude: /(node_modules|bower_components)/
            }*/
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            attributes: {
                name: 'style.css'
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.sass', '.css'],
    },

    mode: 'development'
};