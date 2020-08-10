<h1 align='center'>vite-plugin-purge-icons</h1>

<p align='center'>Vite Plugin for <a href="https://github.com/antfu/purge-icons" target="_blank">PurgeIcons</a></p>


## Usage

Install

```bash
npm i vite-plugin-purge-icons -D # yarn add vite-plugin-purge-icons -D
```

Add to your `vite.config.js`

```ts
import PurgeIcons from 'vite-plugin-purge-icons'

export default {
  plugins: [
    PurgeIcons()
  ]
}
```

Import the `@purge-icons/generated` in your `main.js`

```ts
import { createApp } from 'vue'
import App from './App.vue'

import '@purge-icons/generated' // <-- This

createApp(App).mount('#app')
```

## Configuration

Check out in [PurgeIcons](https://github.com/antfu/purge-icons#README)

## Example

See the [Vitesse](https://github.com/antfu/vitesse) starter template.

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
