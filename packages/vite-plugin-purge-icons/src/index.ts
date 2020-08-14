import type { Plugin } from 'vite'
import { PurgeIconsOptions } from '@purge-icons/core'
import createRollupPlugin from 'rollup-plugin-purge-icons'
import { createServerPlugin } from './server'

export default function createPlugin(options: PurgeIconsOptions = {}): Plugin {
  const parsedOptions: PurgeIconsOptions = {
    content: [
      '**/*.html',
      '**/*.pug',
      '**/*.vue',
      '**/*.js',
      '**/*.ts',
    ],
    iconifyImportName: '@iconify/iconify',
    ...options,
  }

  return {
    configureServer: createServerPlugin({
      ...parsedOptions,
      iconifyImportName: `/@modules/${parsedOptions.iconifyImportName}`,
    }),
    rollupInputOptions: {
      plugins: [
        createRollupPlugin(parsedOptions),
      ],
    },
  }
}
