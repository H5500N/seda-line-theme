const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'app': './src/assets/js/app.js',
        'animations': './src/assets/js/animations.js',
        'ai-chatbot': './src/assets/js/ai-chatbot.js',
        'ai-recommendations': './src/assets/js/ai-recommendations.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true
    }
};
