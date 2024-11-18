import merge from 'webpack-merge'

import { baseConfig } from './baseConfig'

export default merge(baseConfig, {
    mode: 'production'
})