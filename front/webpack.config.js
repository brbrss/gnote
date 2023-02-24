const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public/")
        },
        historyApiFallback: true,
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        devMiddleware: {
            publicPath: "https://localhost:3001/dist/",
        },
        hot: "only",
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};