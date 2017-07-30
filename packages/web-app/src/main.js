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

import App from 'App.js'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

const ROOT = document.getElementById('root')

// Render the page after all resources in the header loads.
window.addEventListener('load', () => {
  render(<AppContainer><App/></AppContainer>, ROOT)
})

// Enable hot reloading.
if (module.hot) {
  module.hot.accept('App.js', () => {
    let ReloadedApp = require('App.js').default
    render(<AppContainer><ReloadedApp/></AppContainer>, ROOT)
  })
}
