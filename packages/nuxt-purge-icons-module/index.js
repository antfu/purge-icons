import PurgeIconsPlugin from 'purge-icons-webpack-plugin'

const defaultOptions = {
  content: [
    '**/*.html',
    '**/*.vue',
    '**/*.js',
    '**/*.ts',
  ],
}

module.exports = function(moduleOptions = {}) {
  this.extendBuild((config) => {
    const options = Object.assign({}, defaultOptions, this.options.purgeIcons || {}, moduleOptions)
    config.plugins.push(new PurgeIconsPlugin(options))
  })

  this.addPlugin(require.resolve('nuxt-purge-icons-module/plugin.js'))
}
