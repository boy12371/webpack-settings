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

let createBasicSettings = require('./shared')

// The parent script must be the actual webpack config file at the root of the
// project so that we can determine the project’s directory.
const PROJECT_DIR = path.dirname(module.parent.filename)

// Settings skeleton.
let settings = createBasicSettings(PROJECT_DIR)

settings.target = 'node'

// Excluding all external modules from the bundle as it really doesn't make sense
// to bundle them if the script is being executed with NodeJS.
settings.externals.push(nodeExternals())

// Disable polyfills.
settings.node = {
  __dirname: false,
  __filename: false
}

if (IS_DEV) {
  // Adds source map support for exceptions.
  settings.plugins.push(
    new webpack.BannerPlugin({
      banner: 'require("source-map-support/register");',
      entryOnly: false,
      raw: true
    })
  )
}

// Makes the script executable.
settings.plugins.push(
  new webpack.BannerPlugin({
    banner: '#!/usr/bin/env node',
    entryOnly: false,
    raw: true
  })
)

if (!IS_DEV) {
  // Compress and remove comments.
  settings.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  )
}

module.exports = settings
