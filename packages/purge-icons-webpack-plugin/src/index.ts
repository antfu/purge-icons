import type { Compiler } from 'webpack'
import { PurgeIcons as Purge, PurgeIconsOptions } from '@purge-icons/core'
// @ts-ignore
import VirtualModulesPlugin from 'webpack-virtual-modules'

const modulePath = 'node_modules/@purge-icons/generated'

export class PurgeIcons {
  plugin: any

  constructor(public readonly options: PurgeIconsOptions = {}) {
    this.plugin = new VirtualModulesPlugin({ [modulePath]: '' })
  }

  apply(compiler: Compiler) {
    this.plugin.apply(compiler)

    Purge({
      ...this.options,
      format: 'cjs',
    })
      .then((code) => {
        this.plugin.writeModule(modulePath, code)
      })
  }
}

export default PurgeIcons
