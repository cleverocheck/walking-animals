import merge from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'

import { baseConfig } from './baseConfig'
import { EPath } from '../data/EPath'

export default merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [EPath.DEFAULT_STATIC]
    })
  ]
})
