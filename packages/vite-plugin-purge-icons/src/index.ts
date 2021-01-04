import type { Plugin } from 'vite'
import { PurgeIconsOptions } from '@purge-icons/core'
import createRollupPlugin from 'rollup-plugin-purge-icons'

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

  return createRollupPlugin(parsedOptions)
}
