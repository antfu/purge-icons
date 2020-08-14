<h1 align='center'>purge-icons-loader</h1>

<p align='center'>Webpack loader for <a href="https://github.com/antfu/purge-icons" target="_blank">PurgeIcons</a></p>


## Usage

Install

```bash
npm i purge-icons-loader -D # yarn add purge-icons-loader -D
```

Add to your `webpack.config.js`

```ts
const PurgeIcons = require('purge-icons-loader')

module.exports = {
  plugins: [
    PurgeIcons({
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
