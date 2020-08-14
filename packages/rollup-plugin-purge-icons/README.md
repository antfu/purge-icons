<h1 align='center'>rollup-plugin-purge-icons</h1>

<p align='center'>Rollup Plugin for <a href="https://github.com/antfu/purge-icons" target="_blank">PurgeIcons</a></p>


## Usage

Install

```bash
npm i rollup-plugin-purge-icons -D # yarn add rollup-plugin-purge-icons -D
```

Add it to `rollup.config.js`

```ts
import PurgeIcons from 'rollup-plugin-purge-icons'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    PurgeIcons({
      /* PurgeIcons Options */
    })
  ],
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
