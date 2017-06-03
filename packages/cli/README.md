Common Webpack settings for cli apps.

## Installation

```shell
npm install ctrine-webpack-settings-cli
```

## Usage

The settings can be used directly in your `webpack.config.js` like so:

```Javascript
module.exports = require('ctrine-webpack-settings-cli').default
```

Add the [Ctrine - Node Babel Preset](https://github.com/ctrine/babel-presets) to
the `.babelrc`:

```json
{
  "presets": ["ctrine-node"]
}
```

Add the [Ctrine - Node Lint](https://github.com/ctrine/lint-config) to the
`.eslintrc.json`:

```json
{
  "extends": "ctrine-js-node",
  "parser": "Babel-ESLint"
}
```

## Expected directory structure

```
build
src
  main.js
.babelrc
.eslintrc.json
webpack.config.js
```
* **build:** Directory where the compiled files will reside.
* **src:** Project’s source.
* **main.js:** Entry point.
* **.babelrc**: Preset with the necessary dependencies to compile the app.
* **.eslintrc**: ESLint settings.
* **webpack.config.js:** Actual Webpack config, the location of this file is
  used do determine the location of the `build` and `src` directories.

## Features

* SASS, LESS and Stylus.
* All CSS files are processed with [PostCSS](https://github.com/postcss/postcss).
* [CSS modules with the extensions][css-modules-extensions]: `.module.css`,
  `.module.less`, `.module.sass`, `.module.scss`
  and `.module.styl`.
