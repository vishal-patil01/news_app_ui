const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/test.ts', // The entry point for tests
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Use ts-loader to handle TypeScript files
        exclude: /node_modules/,
      },
    ],
  },
};
