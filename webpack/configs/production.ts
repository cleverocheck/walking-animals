import merge from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'

import { baseConfig } from './baseConfig'
import path from 'path'
import { EPath } from '../data/EPath'

export default merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [path.join(process.cwd(), EPath.STATIC)]
    })
  ]
})
