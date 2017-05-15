Common webpack settings for web apps.

## Installation

```shell
npm install ctrine-webpack-settings-web
```

## Usage

The settings can be used directly in your `webpack.config.js` like so:

```Javascript
module.exports = require('ctrine-webpack-settings-web')
```

## Expected directory structure

```
build
src
  main.js
webpack.config.js
```
* **build:** Directory where the compiled files will reside.
* **src:** Project’s source.
* **index.html:** Optional template used as the entry point for you single page
  app. This can be used if you need to import external libraries.
* **main.js:** Entry point
* **webpack.config.js:** Actual webpack config, the location of this file is
  used do determine the location of the `build` and `src` directories.
