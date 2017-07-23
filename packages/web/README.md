Common Webpack settings for web apps.

## Example

[You can find the example in examples directory.](../../examples/web)

## Installation

```shell
npm install ctrine-webpack-settings-web
```

## Usage

### Webpack settings

The settings can be used directly in your `webpack.config.js` like so:

```Javascript
module.exports = require('ctrine-webpack-settings-web').default
```

### Babel preset (Optional)

[A babel preset is also included](https://github.com/ctrine/babel-presets) and it
contains a lot of useful plugins to support all the bleeding edge features
available for babel. Add it to the `.babelrc` like so:

```json
{
  "presets": ["ctrine-web"]
}
```

### ESLint settings (Optional)

[ESLint settings](https://github.com/ctrine/lint-config) containing the recommended
code style is also included. Add it to the `.eslintrc.json` like so:

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
* All CSS files are processed with [PostCSS][postcss].
* [CSS modules with the extensions][css-modules-extensions]: `.module.css`,
  `.module.less`, `.module.sass`, `.module.scss`
  and `.module.styl`.
* [Hot Reloading for ReactJS](https://github.com/gaearon/react-hot-loader).

[css-modules-extensions]: https://github.com/css-modules/css-modules/issues/229#issuecomment-304040593
[postcss]: https://github.com/postcss/postcss
