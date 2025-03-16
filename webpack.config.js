const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
console.log(__dirname)
module.exports = {
    mode: "development",
    entry: "./src/style.css",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/img/[name][ext]",
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext]",
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: "assets/css/styles.css" }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            minify: { collapseWhitespace: true, removeComments: true },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" }, // Copy all assets as is
            ],
        }),
        new CssMinimizerPlugin(),
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.(css|html|js|svg)$/,
        }),
        new BrowserSyncPlugin(
            {
                host: "localhost",
                port: 3000,
                server: { baseDir: ["build"] },
            },
            { reload: true }
        ),
    ],
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
};
