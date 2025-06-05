const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config ={ 
    splitChunks: {
      chunks: 'all'
  }
  }

if(isProd) {
  config.minimizer =[
    new CssMinimizerPlugin(),
    new TerserWebpackPlugin()
  ]
}
  return config 
}


module.exports = {
 context: path.resolve(__dirname, 'src'),
    mode: 'development',
  entry: {
    main: './js/main.js',
  },
  optimization: optimization(),
devServer: {
  static: {
    directory: path.join(__dirname, 'dist'), // откуда раздавать файлы
  },
  port: 3000, // порт (можно любой)
  open: true, // автоматически открывать браузер
  hot: isDev, // Убедитесь, что эта опция включена
  liveReload: true,
  watchFiles: ['src/**/*.html', 'src/**/*.js', 'src/**/*.css'],
},
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  } ,
  plugins: [
    new HTMLWebpackPlugin({
         template: './index.html',
         minify: {
          collapseWhitespace: isProd
         }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/favicon.ico')  // Указываем полный путь с именем файла
        }
      ]
    }), 
    new MiniCssExtractPlugin ({
      filename: '[name].[contenthash].css'
    })
  ] ,
   module: {
    rules: [
        {
            test: /\.css$/,
            test: /\.css$/i,
            use: [
              process.env.NODE_ENV === 'development'
                ? 'style-loader'  // Используем style-loader для dev-режима
                : MiniCssExtractPlugin.loader, // И mini-css-extract-plugin для production
              'css-loader'
            ]
        }, 
        {
          test: /\.less$/,
          test: /\.less$/i,
          use: [
            process.env.NODE_ENV === 'development'
              ? 'style-loader'  // Используем style-loader для dev-режима
              : MiniCssExtractPlugin.loader, // И mini-css-extract-plugin для production
            'css-loader',
            'less-loader'
          ]
      },
      {
        test: /\.s[ac]ss$/,
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'  // Используем style-loader для dev-режима
            : MiniCssExtractPlugin.loader, // И mini-css-extract-plugin для production
          'css-loader', 
          'sass-loader'
        ]
    },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource', // Вместо file-loader в Webpack 5+
          generator: {
            filename: 'images/[name].[hash][ext][query]' // Современный синтаксис
          },
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[hash].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
    ]
  }
}