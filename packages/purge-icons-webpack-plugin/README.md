<h1 align='center'>purge-icons-webpack-plugin</h1>

<p align='center'>Webpack plugin for <a href="https://github.com/antfu/purge-icons" target="_blank">PurgeIcons</a></p>


## Usage

Install

```bash
npm i purge-icons-webpack-plugin -D # yarn add purge-icons-webpack-plugin -D
```

Add it to `webpack.config.js`

```ts
const { PurgeIcons } = require('purge-icons-webpack-plugin')

// webpack.config.js
module.exports = {
  // ...options
  plugins: [
    new PurgeIcons({
      /* PurgeIcons Options */
    })
  ]
}
```

Import `@purge-icons/generated` in your entry file

```ts
import '@purge-icons/generated' // <-- This
```

## Configuration

Check out in [PurgeIcons](https://github.com/antfu/purge-icons#programmatic-api)

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
