Common Webpack settings for web apps.

## Installation

```shell
npm install ctrine-webpack-settings-web
```

## Usage

The settings can be used directly in your `webpack.config.js` like so:

```Javascript
module.exports = require('ctrine-webpack-settings-web').default
```

Add the [Ctrine - Web Babel Preset](https://github.com/ctrine/babel-presets) to
the `.babelrc`:

```json
{
  "presets": ["ctrine-web"]
}
```

Add the [Ctrine - Web Lint](https://github.com/ctrine/lint-config) to the
`.eslintrc.json`:

```json
{
  "extends": "ctrine-js-web",
  "parser": "Babel-ESLint"
}
```

## Expected directory structure

```
build
src
  App.js
  index.html
.babelrc
.eslintrc.json
webpack.config.js
```
* **build:** Directory where the compiled files will reside.
* **src:** Project’s source.
* **index.html:** Optional template used as the entry point for you single page
  app. This can be used if you need to import external libraries.
* **App.js:** Your app class.
* **index.html:** Optional template used to render the app. It must have an
  element with the attribute `id="root"`.
* **.babelrc**: Preset with the necessary dependencies to compile and enable hot
  loading.
* **.eslintrc**: ESLint settings.
* **webpack.config.js:** Actual Webpack config, the location of this file is
  used do determine the location of the `build` and `src` directories.

## Features

* SASS, LESS and Stylus.
* All CSS files are processed with [PostCSS](https://github.com/postcss/postcss).
* [CSS modules with the extensions][css-modules-extensions]: `.module.css`,
  `.module.sass`, `.module.scss`
  and `.module.styl`.
* [Hot loading for React JS](https://github.com/gaearon/react-hot-loader).

[css-modules-extensions]: https://github.com/css-modules/css-modules/issues/229#issuecomment-304040593
