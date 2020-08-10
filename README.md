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

## How It Works

[**Iconify**](https://iconify.design) is an icon framework that provide an unified syntax to use icons from the its [huge collections](https://iconify.design/icon-sets/) on-demanded. Each icon set has it's own id as the prefix of the a specific icon. For example:

```html
<span class="iconify" data-icon="fa:home"></span>   <!-- Font Awesome -->
<span class="iconify" data-icon="noto:bird"></span> <!-- Note Icons -->
<span class="iconify" data-icon="mdi:alert"></span> <!-- Material Design Icons -->
```

Iconify archive that by building up a API service that only send you the icons you need. It provides a great flexibility that you can try with different design style and without to worry about including a large amount of unused icons that eat up your bandwidth and slow down your page load.

However, the down side of API querying is that the icons won't be available on the first meaningful paint and your app will be heavy relied on the API servers' status and its accessability from your users.

For this, Iconify does provide some [offline solutions by implementing frameworks components](https://docs.iconify.design/implementations/#components). But with them, you would need to manually import every icons you use. Which make you lost the simple syntax in API based solutions.

So, PurgeIcons was born. By scaning your code, it generates [bundles](https://docs.iconify.design/sources/bundles/) for Iconify and load them synchronously. You can use icons in the exact same way as you would with the API based solution.


## Frameworks Plugins

**PurgeIcons** is designed to be framework independent, but using framework plugins is the most recommended way to get started. Check out the supported frameworks in the following list. We are trying to make more frameworks able to use PurgeIcons out-of-box. Pull requests are great welcome!

### Official

- [vite-plugin-purge-icons](./packages/vite-plugin-purge-icons)

## Command Line Interface

> The CLI is still working in progress and the design is not yet finalized.

You can either install PurgeIcons as a dev dependency and use the CLI with npx or you can also install PurgeIcons globally:

```bash
npm i -g purge-icons
```

```bash
purge-icons --help
```

## Programmatic API

> Programmatic API is still working in progress as well.

```bash
npm i -D purge-icons
```

```ts
import { PurgeIconsOptions, PurgeIcons } from 'purge-icons'

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
  ]
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


## TODO

- CLI output
- Better caching
- Plugins for frameworks (Vue CLI, Nuxt.js, Next.js, etc.) PR welcome!
- Font-based icons (Javascript Free)

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
