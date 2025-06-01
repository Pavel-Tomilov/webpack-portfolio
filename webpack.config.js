const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
 context: path.resolve(__dirname, 'src'),
    mode: 'development',
  entry: {
    main: './js/main.js',
    
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  } ,
  plugins: [
    new HTMLWebpackPlugin({
         template: './index.html'
    }),
    new CleanWebpackPlugin()
  ] ,
   module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }, 
         {
               test: /\.(png|jpeg|jpg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]'
      }
        }
    ]
  }
}