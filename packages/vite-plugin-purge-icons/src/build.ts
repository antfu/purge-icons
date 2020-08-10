import type { Plugin } from 'vite'
import { PurgeIcons, PurgeIconsOptions } from 'purge-icons'
import { IMPORT_PATH } from './constants'

type ElementType<T extends Array<any>> = T extends Array<infer R> ? R : never
type RollupPlugin = ElementType<NonNullable<NonNullable<Plugin['rollupInputOptions']>['plugins']>>

export function createRollupPlugin(options: PurgeIconsOptions): RollupPlugin {
  return {
    name: 'purge-icons',
    resolveId(source) {
      if (source === IMPORT_PATH)
        return source

      return null
    },
    async load(id) {
      if (id === IMPORT_PATH)
        return await PurgeIcons(options)

      return null
    },
  }
}
