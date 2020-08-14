import type { Plugin } from 'vite'
import { PurgeIconsOptions } from '@purge-icons/core'
import createRollupPlugin from 'rollup-plugin-purge-icons'
import { createServerPlugin } from './server'

export default function createPlugin(options: PurgeIconsOptions = {}): Plugin {
  const parsedOptions: PurgeIconsOptions = {
    content: [
      '**/*.html',
      '**/*.vue',
      '**/*.js',
      '**/*.ts',
    ],
    ...options,
  }

  return {
    configureServer: createServerPlugin({
      ...parsedOptions,
      iconifyImport: 'import Module from "/@modules/@iconify/iconify.js"\nconst Iconify = Module.default',
    }),
    rollupInputOptions: {
      plugins: [
        // @ts-ignore
        createRollupPlugin({
          ...parsedOptions,
          iconifyImport: 'import Module from "@iconify/iconify"\nconst Iconify = Module.default',
        }),
      ],
    },
  }
}
