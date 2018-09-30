# Reusable build configuration for Drupal Editable JS libraries

This module contains webpack config factory function for Drupal Editable modules.

It uses the config key from the `package.json` of the module and the `NODE_ENV` flag to build the correct webpack configuration.

## Example usage

(project `package.json`)

```json
{
  "scripts": {
    "build": "npm run build:dev && npm run build:prod",
    "build:dev": "NODE_ENV=development webpack --config ./node_modules/@1xinternet/editable-webpack-config",
    "build:prod": "NODE_ENV=production webpack --config ./node_modules/@1xinternet/editable-webpack-config"
  },
  "config": {
    "namespace": "MyCustomNameSpace",
    "bundleName": "file_name_for_the_bundle",
    "isEditableRoot": "false",
    "externals": {
      "EditableBaseComponents": "@1xinternet/editable-base-components"
    }
  }
}
```

Code entry is at `./src/index.js` – bundle files will be named after `bundleName`and written to `./dist/`

`externals` is merged into the externals config of webpack. These libraries can be required in the library but will not be part of the built bundle. They are expected to be available within the global namespace.

## `isEditableRoot` flag

This flag is only required for the root editable JS library. It enables exposing some libraries to the global namespace. This is not needed for any other libraries depending on the core/root library! (simply remove this key)

## Installation

The webpack config requires some libraries to be installed. Install them with this command:

```bash
npm i -D @babel/core @babel/plugin-proposal-class-properties @babel/plugin-syntax-export-default-from @babel/preset-env @babel/preset-react babel-loader react-dev-utils webpack webpack-cli
```

If you get an error from babel, this might be due to modules depending on the old version of babel-core. To fix this, try:

```bash
npm i -D babel-core@^7.0.0-bridge.0
```
