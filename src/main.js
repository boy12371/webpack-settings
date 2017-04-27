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
let HtmlPlugin = require('html-webpack-plugin')
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

function getSharedSkeleton(projectDir) {
  // Location of the final settings creator.
  const SETTINGS_DIR = path.dirname(module.parent.filename)

  // Directory where the files will reside.
  const BUILD_DIR = path.join(projectDir, 'build')

  // Paths used to search for modules and project’s files.
  const MODULE_PATHS = [
    // Some dependencies might be installed inside the settings directory, this
    // is useful when changes are made to this project locally.
    path.join(SETTINGS_DIR, '..', 'node_modules'),
    // Main lookup directories.
    path.join(projectDir, 'node_modules'),
    path.join(projectDir, 'src'),
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
      __filename: false,
      Buffer: false,
      console: false,
      global: false,
      process: false,
      setImmediate: false
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
    }
  }
}

function getNodeSkeleton(projectDir) {
  let settings = getSharedSkeleton(projectDir)

  // Target environment.
  settings.target = 'node'

  // NodeJS already expects a file with this name so it makes sense for the
  // compiled entry point be like this and save a few chars when trying to
  // execute the file.
  settings.output.filename = 'index.js'

  // Excluding all external modules from the bundle as it really doesn't make
  // sense to bundle them if the script is being executed Node.
  settings.externals.push(nodeExternals())

  if (IS_DEV) {
    settings.plugins.push(
      // Adds source map support for exceptions in dev builds.
      new webpack.BannerPlugin({
        banner: 'require("source-map-support/register");',
        entryOnly: false,
        raw: true
      })
    )
  }

  return settings
}

function getCliSkeleton(projectDir) {
  let settings = getNodeSkeleton(projectDir)

  // Make the script executable.
  settings.plugins.push(
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      entryOnly: false,
      raw: true
    })
  )

  return settings
}

function getWebSkeleton(projectDir) {
  let settings = getSharedSkeleton(projectDir)

  // Target environment.
  settings.target = 'web'

  // The hash in the end is used by HtmlPlugin.
  settings.output.filename = 'script.js?[hash:8]'

  // Main entry point to the single page app.
  settings.plugins.push(
    new HtmlPlugin({
      template: path.join(projectDir, 'src', 'index.html')
    })
  )

  return settings
}

module.exports = (projectDir, environment) => {
  let settings = {}
  switch (environment) {
  case 'cli':
    settings = getCliSkeleton(projectDir)
    break
  case 'node':
    settings = getNodeSkeleton(projectDir)
    break
  case 'web':
    settings = getWebSkeleton(projectDir)
  }

  if (!IS_DEV) {
    // Compress and remove comments in production.
    settings.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        comments: false
      })
    )
  }

  return settings
}
