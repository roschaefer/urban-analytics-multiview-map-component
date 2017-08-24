var path = require('path')
const webpack = require('webpack');
const PATHS = {
    src: path.join(__dirname, './src'),
    build: path.join(__dirname, './dist')
}


module.exports = {
    entry: {
        "multiview-map-component": PATHS.src + '/components/MultiviewMap.tsx',
    },
    output: {
        path: PATHS.build,
        filename: "[name].js",
        library: 'multiview-map-component',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/},
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
                query:
                {
                    presets:['es2015', 'react'],
                    plugins: ['transform-class-properties'],
                    env: {
                        development: {
                            presets: ['react-hmre'],
                        },
                    },
                },
            }],
    },
    watchOptions: {
        poll: 1000,
    },
    devServer: {
        historyApiFallback: {
            index: '/',
        },
    },

};
