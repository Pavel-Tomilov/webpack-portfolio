const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
 context: path.resolve(__dirname, 'src'),
    mode: 'development',
  entry: {
    main: './js/main.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
  }
},
devServer: {
  static: {
    directory: path.join(__dirname, 'dist'), // откуда раздавать файлы
  },
  port: 3000, // порт (можно любой)
  open: true, // автоматически открывать браузер
},
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  } ,
  plugins: [
    new HTMLWebpackPlugin({
         template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/favicon.ico')  // Указываем полный путь с именем файла
        }
      ]
    })
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