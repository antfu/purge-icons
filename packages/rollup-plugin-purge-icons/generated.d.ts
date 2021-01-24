import Iconfiy from '@iconify/iconify'

declare module 'rollup-plugin-purge-icons/generated' {
  export * from '@iconify/iconify'
  export default Iconfiy
}
