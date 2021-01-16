<h1 align='center'>vite-plugin-purge-icons</h1>

<p align='center'>Vite Plugin for <a href="https://github.com/antfu/purge-icons" target="_blank">PurgeIcons</a></p>


## Usage

> ℹ️ **Vite 2 is supported from `v0.5.x`, Vite 1's support is discontinued.**

Install

```bash
npm i @iconify/iconify
npm i vite-plugin-purge-icons @iconify/json -D
```

> `@iconify/json` is an optional dependencies of PurgeIcons. When it presents in your `node_modules`, PurgeIcons will load the icons from it locally, otherwise, PurgeIcons will try to fetch the iconset your requested online.

Add it to `vite.config.js`

```ts
// vite.config.js
import PurgeIcons from 'vite-plugin-purge-icons'

export default {
  plugins: [
    PurgeIcons({
      /* PurgeIcons Options */
    })
  ]
}
```

Import `@purge-icons/generated` in your `main.js`

```ts
import { createApp } from 'vue'
import App from './App.vue'

import '@purge-icons/generated' // <-- This

createApp(App).mount('#app')
```

## Configuration

Check out in [PurgeIcons](https://github.com/antfu/purge-icons#programmatic-api)

## Example

See the [Vitesse](https://github.com/antfu/vitesse) starter template.

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
