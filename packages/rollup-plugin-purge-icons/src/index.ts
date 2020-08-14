import { PurgeIcons, PurgeIconsOptions } from '@purge-icons/core'
import { IMPORT_PATH } from '../../constants'

export default function plugin(options: PurgeIconsOptions) {
  return {
    name: 'purge-icons',
    resolveId(source: string) {
      if (source === IMPORT_PATH)
        return source

      return null
    },
    async load(id: string) {
      if (id === IMPORT_PATH)
        return await PurgeIcons(options)

      return null
    },
  }
}
