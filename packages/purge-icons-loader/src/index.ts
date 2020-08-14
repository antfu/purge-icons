import type { loader } from 'webpack'
import { PurgeIcons, PurgeIconsOptions } from '@purge-icons/core'
import { getOptions } from 'loader-utils'

const PurgeIconsLoader: loader.Loader = function(source, map) {
  const options: PurgeIconsOptions = getOptions(this)

  PurgeIcons(options)
    .then((code) => {
      this.callback(
        null,
        code,
        map,
      )
    })
    .catch((err) => {
      this.callback(
        err,
      )
    })
}

export default PurgeIconsLoader
