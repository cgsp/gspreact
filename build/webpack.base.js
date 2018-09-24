const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    // 这个地方是'/public/'
    publicPath: '/public/'
  },
  module: {
    rules: [
      // 编译之前，先用eslint-loader检查
      // 一旦检查报错了，就不执行编译，把错误信息抛出来
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
}
