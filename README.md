It's now recommended to use [UnoCSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons), [unplugin-icons](https://github.com/antfu/unplugin-icons) or [Iconify Icon Components](https://docs.iconify.design/icon-components/components/) instead of this approach.

----


<h1 align='center'><samp>PurgeIcons</samp></h1>

<p align='center'>Bundles only the icons you use</p>

<p align='center'><em>Think about TailwindCSS + PurgeCSS, but for Icons.</em>

<br>
<br>

<a href='https://www.npmjs.com/package/purge-icons'>
<img src='https://img.shields.io/npm/v/purge-icons?color=222&style=flat-square'>
</a>
</p>

<p align='center'>
<img src='https://user-images.githubusercontent.com/11247099/89781398-ce625a80-db45-11ea-86bf-d50471c526b7.gif' alt='GIF Demo'/>
</p>


## Intro

**PurgeIcons** is heavily inspired from [PurgeCSS](https://purgecss.com/). It analyzes your source code or dist files, extracting the icon names you used, and then bundle the icons' data (SVGs) into your code.

**You will only get icons you need. No extra bandwidth, no unused icons, no compromise.**

Underneath, it's powered by [**Iconify**](https://iconify.design), which you get access to 80+ popular open source iconsets with over 5,000 icons to choice, including ***Material Design Icons***, ***Font Awesome***, ***Octicon*** and even ***Emojis***!

Browser the icon sets in [Icônes](https://icones.netlify.app/) or [Iconify](https://iconify.design/icon-sets/).


## Usage

Just like what you used to do for Iconify.

```html
<span class="iconify" data-icon="fa:home"></span>
```

Or even dynamic

```js
const span = createElement('span')
span.class = 'iconify'
span.data.icon = isDark ? 'carbon:moon' : 'carbon:sun'

// DON'T, PurgeIcons won't extract them correct.
// add them to `included` to be always bundled if you really want this
span.data.icon = `carbon:${isDark ? 'moon' : 'sun'}`
```

## Install

**PurgeIcons** is designed to be framework independent, but using framework plugins is the most recommended way to get started. Check out the supported frameworks in the following list. We are trying to make more frameworks able to use PurgeIcons out-of-box. Pull requests are great welcome!

### Official Plugins

| | Plugin | Example | Template |
| --- | --- | --- | --- |
| Vite | [vite-plugin-purge-icons](./packages/vite-plugin-purge-icons) | [Example](./examples/vite) | [Vitesse](https://github.com/antfu/vitesse) |
| Nuxt | [nuxt-plugin-purge-module](./packages/nuxt-plugin-purge-module) | [Example](./examples/nuxt) | |
| Vue CLI | Coming... | | |
| Gridsome | Coming... | | |
| Parcel | Coming... | | |
| Webpack | [purge-icons-webpack-plugin](./packages/purge-icons-webpack-plugin) | | |
| Rollup | [rollup-plugin-purge-icons](./packages/rollup-plugin-purge-icons) | | |

<br>

## Command Line Interface

> The CLI is still working in progress and the design is not yet finalized.

You can either install PurgeIcons as a dev dependency and use the CLI with npx or you can also install PurgeIcons globally:

```bash
npm i -g purge-icons

```

Scan the all the html file and geneted a `mjs` bundle

```bash
purge-icons --content 'src/*.html' --format mjs --output output.js
```

From multiple sources and use args shorthands, `format` can be auto inferred from the `output` option  

```bash
purge-icons -c 'index.html,src/**/*.vue' -o output.ts
```

Or export plain json file for other tools to process

```bash
purge-icons -c index.html -o output.json
```

See more options by

```bash
purge-icons --help
```

## Programmatic API

> Programmatic API is still working in progress as well.

For programmatic use only, you can use `@purge-icons/core`

```bash
npm i -D @purge-icons/core
```

```ts
import { PurgeIconsOptions, PurgeIcons } from '@purge-icons/core'

const code = await PurgeIcons({
  // globs for searching source file to analyze
  content: [
    '**/*.html',
    '**/*.js',
    '**/*.vue', // scan for .vue file as well
  ],
  // whitelist for icons that might be used dynamically
  included: [
    'mdi:account-circle-outline', // from Material Design Icons
    'fa:camera', // from Font Awesome 4
  ],
  format: 'mjs'
})

// code is generated with inlined icons's data, bundle the file and it's done.
fs.promises.writeFiles('./icons.mjs', code, 'utf-8')
```

### Options 

```ts
export interface PurgeIconsOptions {
  content?: (string | RawContent)[]
  included?: string[]
  extractors?: Extractor[]
  iconSource?: IconSource // default to 'auto'
}
```

## How It Works

[**Iconify**](https://iconify.design) is an icon framework that provide an unified syntax to use icons from its [huge collections](https://iconify.design/icon-sets/) on-demanded. Each icon set has a id as the prefix of for its icons. For example:

```html
<span class="iconify" data-icon="fa:home"></span>   <!-- Font Awesome -->
<span class="iconify" data-icon="noto:bird"></span> <!-- Note Icons -->
<span class="iconify" data-icon="mdi:alert"></span> <!-- Material Design Icons -->
```

Iconify achieve that by building up a API service that only send the icons you need. It provides a great flexibility that you can try with different design style and without to worry about including a large amount of unused icons that eat up your bandwidth and slow down your page load.

However, the downside of API querying is that the icons won't be available on the first meaningful paint and your app will be heavy relied on the API servers' status and so its accessability for your users. Iconify also provides the [offline solution by implementing frameworks components](https://docs.iconify.design/implementations/#components). In that way, you would need to manually import every icon you use.

Thus, PurgeIcons was born. By scanning your code, it generates [bundles](https://docs.iconify.design/sources/bundles/) for Iconify and load them synchronously. You can use icons in the exact same way as you would with the API based solution.


## TODO

- CLI output
- Better caching
- Plugins for frameworks (Vue CLI, Nuxt.js, Next.js, etc.) PR welcome!
- Font-based icons (Javascript Free)

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
