const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // devtool: 'inline-source-map',
    devtool: 'inline-source-map',
    // performance: {
    //     hints: false,
    //     maxEntrypointSize: 512000,
    //     maxAssetSize: 512000,
    // },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()],
    },
    output: {
        filename: 'main.[contentHash].js',
    },
    module: {
        rules: [
            // archivos dinamicos de ccs
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // para que en la carpeta dist incluya el css global en este caso seria el styles.css se debe inyectar en el index.js
            {
                test: /styles\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
            // file-loader si se usa la version 6 para arriba no funciona con esta configuracion y optamos por copy-webpack-plugin
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: { esModule: false },
            //         },
            //     ],
            // },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({ patterns: [{ from: 'src/assets/images', to: 'assets/images' }] }),
        new CleanWebpackPlugin(),
    ],
};
