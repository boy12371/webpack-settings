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
let path = require('path')
let webpack = require('webpack')

let createBasicSettings = require('./basic')

// The parent script must be the actual webpack config file at the root of the
// project so that we can determine the project’s directory.
const PROJECT_DIR = path.dirname(module.parent.filename)

// Settings skeleton.
let settings = createBasicSettings(PROJECT_DIR)

settings.target = 'web'

// The hash in the end is used by HtmlPlugin.
settings.output.filename = 'script.js?[hash:8]'

// Main entry point to the single page app.
settings.plugins.push(
  new HtmlPlugin({
    template: path.join(PROJECT_DIR, 'src', 'index.html')
  })
)

if (!IS_DEV) {
  settings.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  )
}

// The final settings tweaked for web apps.
module.exports = settings
