import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { Configuration } from 'webpack'

import { EPath } from '../data/EPath'

export const baseConfig: Configuration = {
  entry: path.join(process.cwd(), EPath.SRC, EPath.ENTRY_TS),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new HtmlWebpackPlugin()],
  resolve: {
    extensions: ['.js', '.ts']
  },
  output: {
    filename: EPath.OUTPUT_ENTRY_JS,
    path: path.join(process.cwd(), EPath.BUILD),
    clean: true
  }
}
