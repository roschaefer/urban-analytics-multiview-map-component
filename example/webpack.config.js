var path = require('path')
const webpack = require('webpack');
const PATHS = {
    src: path.join(__dirname, './src'),
    build: path.join(__dirname, './dist')
}

var config = {
    entry: {
        "example": PATHS.src + '/App.tsx',
    },
    output: {
        path: PATHS.build,
        filename: "[name].js",
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: /node_modules/ }
        ]
    },
    watchOptions: {
        poll: 1000,
    },
    devServer: {
        historyApiFallback: {
            index: '/',
        },
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

};

module.exports = config;
