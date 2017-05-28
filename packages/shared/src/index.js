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

import IS_DEV from 'isdev'
import webpack from 'webpack'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

import assetRule from './rules/asset'
import cssModuleRule from './rules/css-module'
import cssRule from './rules/css'
import htmlRule from './rules/html'
import jsRule from './rules/js'
import lessModuleRule from './rules/less-module'
import lessRule from './rules/less'
import rawRule from './rules/raw'
import sassModuleRule from './rules/sass-module'
import sassRule from './rules/sass'
import stylusModuleRule from './rules/stylus-module'
import stylusRule from './rules/stylus'

export function createSettings(projectDir) {
  // Directory where the files will reside.
  const BUILD_DIR = join(projectDir, 'build')

  // Paths used to search for modules and project’s files.
  const MODULE_PATHS = [
    join(projectDir, 'node_modules'),
    join(projectDir, 'src'),
    'node_modules',
    'src'
  ]

  const DEV_PLUGINS = IS_DEV
    // Prints readable module names in the browser console on HMR updates.
    ? [new webpack.NamedModulesPlugin()]
    : []

  // Actual settings.
  return {
    devServer: {
      contentBase: BUILD_DIR,
      historyApiFallback: true,
      port: 3000
    },
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      'main'
    ],
    externals: [],
    module: {
      rules: [
        assetRule,
        cssModuleRule,
        cssRule,
        htmlRule,
        jsRule,
        lessModuleRule,
        lessRule,
        rawRule,
        sassModuleRule(MODULE_PATHS),
        sassRule(MODULE_PATHS),
        stylusModuleRule,
        stylusRule
      ]
    },
    node: {
      // Disable polyfills.
      __dirname: false,
      __filename: false
    },
    output: {
      path: BUILD_DIR
    },
    performance: {
      hints: !IS_DEV
    },
    plugins: [
      ...DEV_PLUGINS
    ],
    resolve: {
      extensions: [
        '.css',
        '.html',
        '.js',
        '.json',
        '.jsx',
        '.less',
        '.module.css',
        '.module.less',
        '.module.sass',
        '.module.scss',
        '.module.styl',
        '.sass',
        '.scss',
        '.styl'
      ],
      modules: MODULE_PATHS
    },
    resolveLoader: {
      modules: MODULE_PATHS
    }
  }
}

export default createSettings(
  // The parent script must be the actual webpack config file at the root of the
  // project so that we can determine the project’s directory.
  dirname(module.parent.filename)
)
