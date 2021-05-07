
module.exports = {
  resolve: {
    modules: [
      __dirname + '/node_modules'
    ],
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "browser": false,
      "assert": false
    } 
  },
  entry: './index.js',
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  }
};
