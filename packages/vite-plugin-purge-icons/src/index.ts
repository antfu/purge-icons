import type { Plugin } from 'vite'
import { PurgeIconsOptions } from 'purge-icons'
import { createServerPlugin } from './server'
import { createRollupPlugin } from './build'

export default function createPlugin(options: PurgeIconsOptions = {}): Plugin {
  const parsedOptions: PurgeIconsOptions = {
    iconifyImport: 'import Module from "/@modules/@iconify/iconify.js"\n const Iconify = Module.default',
    content: [
      '**/*.html',
      '**/*.vue',
      '**/*.js',
      '**/*.ts',
    ],
    ...options,
  }
  return {
    configureServer: createServerPlugin(parsedOptions),
    rollupInputOptions: {
      plugins: [
        createRollupPlugin(parsedOptions),
      ],
    },
  }
}
