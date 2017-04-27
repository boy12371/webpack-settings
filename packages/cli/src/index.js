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

let createBasicSettings = require('./main')
let path = require('path')

module.exports = createBasicSettings(
  // The parent script must be the actual webpack config file at the root of the
  // project so that we can determine the project’s directory.
  path.dirname(module.parent.filename),
  'cli'
)
