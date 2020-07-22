module.exports = {
  mode: 'production',
  watch: true,
  entry: './src/js/index.js',
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'main.js'
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