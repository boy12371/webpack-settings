// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

let HtmlPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      './node_modules',
      './src'
    ],
    extensions: ['.css', '.gcss', '.gsass', '.gscss', '.js', '.scss']
  },
  entry: [
    'babel-polyfill',
    'main'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'script.js?[hash:8]'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      require('./asset'),
      require('./css-module'),
      require('./css'),
      require('./html'),
      require('./js'),
      require('./sass-module'),
      require('./sass')
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    })
  ]
}
