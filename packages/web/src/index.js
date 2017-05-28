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

import HtmlPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { createSettings as createSharedSettings } from 'ctrine-webpack-settings-shared'
import { dirname } from 'path'

export function createSettings(projectDir) {
  let settings = createSharedSettings(projectDir)

  // Target environment.
  settings.target = 'web'

  // The hash in the end is used by HtmlPlugin.
  settings.output.filename = 'script.js?[hash:8]'

  // Main entry point to the single page app.
  const TEMPLATE_PATH = join(projectDir, 'src', 'index.html')

  if (existsSync(TEMPLATE_PATH))
    settings.plugins.push(new HtmlPlugin({ template: TEMPLATE_PATH }))
  else
    settings.plugins.push(new HtmlPlugin())

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
