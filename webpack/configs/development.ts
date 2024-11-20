import { Configuration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import merge from 'webpack-merge'

import { baseConfig } from './baseConfig'

const config: Configuration & {
  devServer: WebpackDevServerConfiguration
} = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    hot: false
  }
}

export default merge(baseConfig, config)
