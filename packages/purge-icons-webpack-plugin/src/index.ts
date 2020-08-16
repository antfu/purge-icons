import type { Compiler } from 'webpack'
import { PurgeIcons, PurgeIconsOptions } from '@purge-icons/core'
// @ts-ignore
import VirtualModulesPlugin from 'webpack-virtual-modules'

const modulePath = 'node_modules/@purge-icons/generated'

export default class PurgeIconsPlugin {
  plugin: any

  constructor(public readonly options: PurgeIconsOptions = {}) {
    this.plugin = new VirtualModulesPlugin({ [modulePath]: '' })
  }

  apply(compiler: Compiler) {
    this.plugin.apply(compiler)

    PurgeIcons({
      ...this.options,
      format: 'cjs',
    })
      .then((code) => {
        this.plugin.writeModule(modulePath, code)
      })
  }
}
