const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpack = require("dotenv-webpack");
const dotenv = require('dotenv');

const jsRules = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-react',
          '@babel/preset-env'
        ]
      }
    }
  }

  const fileLoadRules = {
    test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
    loader: "file-loader"
  }

  const sassRules = {
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            jsRules,
            sassRules,
            fileLoadRules
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new DotenvWebpack(),
        new webpack.DefinePlugin(envKeys)
    ]
    }
  }