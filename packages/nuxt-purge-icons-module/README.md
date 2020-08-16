<h1 align='center'>nuxt-purge-icons-module</h1>

<p align='center'>Nuxt module for <a href="https://github.com/antfu/purge-icons" target="_blank">PurgeIcons</a></p>

## Install

```sh
npm i nuxt-purge-icons-module -D
npm i @iconify/iconify@2
```

In `nuxt.config.js`:

```js
module.exports = {
  /* ...config */

  buildModules: [
    'nuxt-purge-icons-module'
  ],
  purgeIcons: {
    /* PurgeIcons Options */
  }
}
```

## Configuration

Check out in [PurgeIcons](https://github.com/antfu/purge-icons#programmatic-api)

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
