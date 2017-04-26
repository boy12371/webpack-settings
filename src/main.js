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

const IS_DEV = require('isdev')
let path = require('path')
let webpack = require('webpack')

let assetRule = require('./rules/asset')
let cssModuleRule = require('./rules/css-module')
let cssRule = require('./rules/css')
let htmlRule = require('./rules/html')
let jsRule = require('./rules/js')
let lessModuleRule = require('./rules/less-module')
let lessRule = require('./rules/less')
let rawRule = require('./rules/raw')
let sassModuleRule = require('./rules/sass-module')
let sassRule = require('./rules/sass')
let stylusModuleRule = require('./rules/stylus-module')
let stylusRule = require('./rules/stylus')

module.exports = projectDir => {
  // Location of the final settings creator.
  const SETTINGS_DIR = path.dirname(module.parent.filename)

  // Directory where the files will reside.
  const BUILD_DIR = path.join(projectDir, 'build')

  // Paths used to search for modules and project’s files.
  const MODULE_PATHS = [
    // Some dependencies might be installed inside the settings directory, this
    // is useful when changes are made to this project locally.
    path.join(SETTINGS_DIR, '..', 'node_modules'),
    // Lookup directories.
    path.join(projectDir, 'node_modules'),
    path.join(projectDir, 'src'),
    'node_modules',
    'src'
  ]

  const DEV_PLUGINS = !IS_DEV
    ? []
    : [new webpack.NamedModulesPlugin()]

  // Actual settings.
  return {
    resolve: {
      modules: MODULE_PATHS,
      extensions: [
        '.css',
        '.mcss',
        '.msass',
        '.mscss',
        '.html',
        '.js',
        '.json',
        '.jsx',
        '.sass',
        '.scss'
      ],
    },
    resolveLoader: {
      modules: MODULE_PATHS
    },
    entry: [
      'babel-polyfill',
      'main'
    ],
    output: {
      path: BUILD_DIR,
      filename: 'index.js'
    },
    externals: [],
    devtool: 'source-map',
    devServer: {
      contentBase: BUILD_DIR,
      historyApiFallback: true,
      port: 3000
    },
    performance: {
      hints: !IS_DEV
    },
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
    plugins: [ ...DEV_PLUGINS ]
  }
}
