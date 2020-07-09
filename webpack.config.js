module.exports = {
  mode: 'production',
  entry: './js/app.js',
  output: {
    path: `${__dirname}/js`,
    filename: 'converted_app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};