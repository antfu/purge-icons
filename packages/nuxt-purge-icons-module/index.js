
const defaultOptions = {
}

module.exports = function(moduleOptions = {}) {
  this.extendBuild((config) => {
    config.module.rules.push({
      test: '@purge-icons/generated',
      use: [
        {
          loader: 'purge-icons-loader',
          options: Object.assign(defaultOptions, this.options.purgeIcons || {}, moduleOptions),
        },
      ],
    })
  })
}
