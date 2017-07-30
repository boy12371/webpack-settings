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
import HtmlPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { createSettings as createSharedSettings } from '@ctrine/webpack-settings-shared'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const PROJECT_DIR = dirname(module.parent.filename)
const SETTINGS_DIR = dirname(module.filename)

export function createSettings(projectDir) {
  let settings = createSharedSettings(projectDir)

  // Target environment.
  settings.target = 'web'

  // Insert the patch before the entry point and polyfill to enable hot reloading
  // for react apps.
  settings.entry = [
    'react-hot-loader/patch',
    ...settings.entry
  ]

  // Use the default “main” entry point if a custom one is not found.
  const DEFAULT_ENTRY = join(SETTINGS_DIR, 'main.js')
  const CUSTOM_ENTRY = join(projectDir, 'src', 'main.js')

  if (!existsSync(CUSTOM_ENTRY))
    settings.entry[settings.entry.length - 1] = DEFAULT_ENTRY

  // The hash in the end is used by HtmlPlugin.
  settings.output.filename = 'script.js?[hash:8]'

  // Template used to render the app.
  const DEFAULT_TEMPLATE = join(SETTINGS_DIR, 'index.html')
  const CUSTOM_TEMPLATE = join(projectDir, 'src', 'index.html')

  settings.plugins.push(new HtmlPlugin({
    template: existsSync(CUSTOM_TEMPLATE)
      ? CUSTOM_TEMPLATE
      : DEFAULT_TEMPLATE
  }))

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
  PROJECT_DIR
)
