import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../node_modules/@statusfy/core/client/assets/css/tailwind.css'

import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

import _6f6c098b from '../node_modules/@statusfy/core/client/layouts/default.vue'
import _2d2495d5 from '../node_modules/@statusfy/core/client/layouts/home.vue'
import _3ed1deab from '../node_modules/@statusfy/core/client/layouts/incidents.vue'

const layouts = { "_default": _6f6c098b,"_home": _2d2495d5,"_incidents": _3ed1deab }

export default {
  head: {"title":"Statusfy Demo","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"generator","content":"Statusfy"},{"hid":"description","name":"description","content":"A marvelous open source Status Page system"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Statusfy Demo"},{"hid":"author","name":"author","content":"Statusfy"},{"hid":"theme-color","name":"theme-color","content":"#1b1f23"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"Statusfy Demo"},{"hid":"og:url","name":"og:url","property":"og:url","content":"https:\u002F\u002Fstatus.kscout.io"},{"hid":"og:image","name":"og:image","property":"og:image","content":"https:\u002F\u002Fstatus.kscout.io\u002Fstatic\u002Ficons\u002Ficon_512.1bedcf.png"},{"hid":"og:image:width","name":"og:image:width","property":"og:image:width","content":512},{"hid":"og:image:height","name":"og:image:height","property":"og:image:height","content":512},{"hid":"og:image:type","name":"og:image:type","property":"og:image:type","content":"image\u002Fpng"}],"titleTemplate":"%s | Statusfy Demo","link":[{"rel":"manifest","href":"\u002Fstatic\u002Fmanifest.5116c572.json"},{"rel":"shortcut icon","href":"\u002Fstatic\u002Ficons\u002Ficon_16.1bedcf.png"},{"rel":"apple-touch-icon","href":"\u002Fstatic\u002Ficons\u002Ficon_512.1bedcf.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, transitionEl])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
