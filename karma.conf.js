const path = require('path');
module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.test.js'
        ],
        preprocessors: {
            'src/**/*.test.js': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/},
                    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', exclude: /node_modules/,
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
            externals: {
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['mocha'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
    });
};
