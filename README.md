# Drupal-editable

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Drupal 8](https://img.shields.io/badge/Made%20for-Drupal%208-0678be.svg)](https://lernajs.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

> JS library framework to decouple Drupal.

This repository contains multiple node packages administered with [lerna](https://lernajs.io/).

## Contributing

Please read our [code of conduct](./CODE_OF_CONDUCT.md). Collaborating on this project signifies your acceptance of these ground-rules.

**Development tasks:** Run these commands either in this directory or in a `./packages/**` directory to apply them globally to all or only to one package:

- `npm run commit`– Commit after staging something for the interactive [commitizen](http://commitizen.github.io/cz-cli/) cli
- `npm run build` – Build development and production bundles
- `npm run build:dev` – Build only development bundles
- `npm run build:prod` – Build only production bundles
- `npm run lint`– Lint with eslint
- `npm run test`– Test (Currently only for all packages)
