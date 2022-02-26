import type { Plugin } from 'rollup'
import type { PurgeIconsOptions } from '@purge-icons/core'
import { PurgeIcons } from '@purge-icons/core'
import { IMPORT_PATHS } from '../../constants'

export default function CreatePlugin(options: PurgeIconsOptions): Plugin {
  return {
    name: 'purge-icons',
    resolveId(id) {
      if (IMPORT_PATHS.includes(id))
        return id
    },
    async load(id) {
      if (IMPORT_PATHS.includes(id))
        return await PurgeIcons(options)
    },
  }
}
