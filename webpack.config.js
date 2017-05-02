var webpack = require('webpack');

module.exports = {

  output: {
    library: 'ReactRouter',
    libraryTarget: 'umd'
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      },
      'create-react-class': {
        root: 'createReactClass',
        commonjs2: 'create-react-class',
        commonjs: 'create-react-class',
        amd: 'create-react-class'
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

};
