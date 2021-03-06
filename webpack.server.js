const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // Inform webpack that we're building a bundle
    // for nodeJS, rather then for the browser
    target: 'node',

    // Tell webpack the root file of our
    // server application 
    entry: './src/server.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'server_bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options: {
                    presets: [
                        'react', 'stage-0', ['env', {
                            target: { browsers: ['last 2 versions']}
                        }]
                    ]
                } 
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            },
        ]
    },

    // Tell webpack not to bundle any libraries that exist in the 'node_modules' folder
    // into the server bundle
    externals: [webpackNodeExternals()],
    plugins: [
        new ExtractTextPlugin({filename: 'main.css'})
    ]
};