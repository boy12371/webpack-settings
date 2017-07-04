Common Webpack settings for node apps.

## Installation

```shell
npm install ctrine-webpack-settings-node
```

## Usage

### Webpack settings

The settings can be used directly in your `webpack.config.js` like so:

```Javascript
module.exports = require('ctrine-webpack-settings-node').default
```

### Babel preset (Optional)

[A babel preset is also included](https://github.com/ctrine/babel-presets) and it
contains a lot of useful plugins to support all the bleeding edge features
available for babel. Add it to the `.babelrc` like so:

```json
{
  "presets": ["ctrine-node"]
}
```

### ESLint settings (Optional)

[ESLint settings](https://github.com/ctrine/lint-config) containing the recommended
code style is also included. Add it to the `.eslintrc.json` like so:

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
* All CSS files are processed with [PostCSS][postcss].
* [CSS modules with the extensions][css-modules-extensions]: `.module.css`,
  `.module.less`, `.module.sass`, `.module.scss`
  and `.module.styl`.

[css-modules-extensions]: https://github.com/css-modules/css-modules/issues/229#issuecomment-304040593
[postcss]: https://github.com/postcss/postcss
