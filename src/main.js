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
let nodeExternals = require('webpack-node-externals')
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

module.exports = (projectDir, environment) => {
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

  // Plugins that will be used only during development.
  const DEV_PLUGINS = IS_DEV
    ? [new webpack.NamedModulesPlugin()]
    : []


  // Excluding all external modules from the bundle as it really doesn't make
  // sense to bundle them if the script is being executed with NodeJS.
  const NODE_EXTERNALS = environment === 'node'
    ? nodeExternals()
    : []

  // Plugins used during development which are exclusive to node apps.
  const NODE_DEV_PLUGINS = environment === 'node'
    ? [
      // Adds source map support for exceptions.
      new webpack.BannerPlugin({
        banner: 'require("source-map-support/register");',
        entryOnly: false,
        raw: true
      })
    ]
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
    externals: [...NODE_EXTERNALS],
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
      filename: 'index.js',
      path: BUILD_DIR
    },
    performance: {
      hints: !IS_DEV
    },
    plugins: [
      ...DEV_PLUGINS,
      ...NODE_DEV_PLUGINS
    ],
    resolve: {
      extensions: [
        '.css',
        '.html',
        '.js',
        '.json',
        '.jsx',
        '.less',
        '.mcss',
        '.mless',
        '.msass',
        '.mscss',
        '.mstyl',
        '.sass',
        '.scss',
        '.styl'
      ],
      modules: MODULE_PATHS
    },
    resolveLoader: {
      modules: MODULE_PATHS
    },
    target: environment
  }
}
