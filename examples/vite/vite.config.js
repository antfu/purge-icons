import PurgeIcons from 'vite-plugin-purge-icons'
import Vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    Vue(),
    PurgeIcons(),
  ],
}
