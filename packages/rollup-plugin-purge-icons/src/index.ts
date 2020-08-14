import type { Plugin } from 'rollup'
import { PurgeIcons, PurgeIconsOptions } from '@purge-icons/core'
import { IMPORT_PATH } from '../../constants'

export default function CreatePlugin(options: PurgeIconsOptions): Plugin {
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
