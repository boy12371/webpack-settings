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

import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack'
import { createSettings as createSharedSettings } from 'ctrine-webpack-settings-shared'
import { dirname } from 'path'

export function createSettings(projectDir) {
  let settings = createSharedSettings(projectDir)

  // Target environment.
  settings.target = 'node'

  // NodeJS already expects a file with this name so it makes sense for the
  // compiled entry point be like this and save a few chars when trying to
  // execute the file.
  settings.output.filename = 'index.js'

  // Excluding all external modules from the bundle as it really doesn't make
  // sense to bundle them if the script is being executed in Node.
  settings.externals.push(nodeExternals({ whitelist: [
    'babel-polyfill',
    'core-js/fn/regexp/escape',
    'core-js/shim',
    'regenerator-runtime/runtime'
  ]}))

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

  if (!IS_DEV) {
    // Compress and remove comments in production.
    settings.plugins.push(
      new webpack.optimize.UglifyJsPlugin({ comments: false })
    )
  }

  return settings
}

export default createSettings(
  // The parent script must be the actual webpack config file at the root of the
  // project so that we can determine the project’s directory.
  dirname(module.parent.filename)
)
