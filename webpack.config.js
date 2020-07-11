module.exports = {
  mode: 'production',
  watch: true,
  entry: './src/js/app.js',
  output: {
    path: `${__dirname}/dist/js`,
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